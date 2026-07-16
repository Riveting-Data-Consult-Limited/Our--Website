import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useMsal } from "@azure/msal-react";
import { AuthContextType, AuthUser, UserRole, Permission } from "@/types/auth";
import { loginRequest } from "@/config/msal";
import { supabase } from "@/config/supabase";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    "manage_content",
    "manage_users",
    "manage_orders",
    "manage_appointments",
    "view_portal",
    "view_reports",
    "edit_settings",
    "public_access",
  ],
  EMPLOYEE: ["manage_content", "manage_appointments", "view_portal", "view_reports", "public_access"],
  PARTNER: ["view_portal", "view_reports", "public_access"],
  CLIENT: ["view_portal", "public_access"],
  ANONYMOUS: ["public_access"],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync Entra ID account into local auth state
  useEffect(() => {
    if (accounts.length > 0) {
      const account = accounts[0];
      const entraUser: AuthUser = {
        id: account.homeAccountId,
        email: account.username,
        name: account.name || account.username,
        role: "EMPLOYEE",
        permissions: DEFAULT_PERMISSIONS.EMPLOYEE,
        entraId: account.homeAccountId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setUser(entraUser);
      setIsLoading(false);
    }
  }, [accounts]);

  // Check for existing Supabase session on mount
  useEffect(() => {
    const initializeSupabaseAuth = async () => {
      if (accounts.length > 0) return; // Entra ID takes priority

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const clientUser: AuthUser = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.name || session.user.email || "",
            role: (session.user.user_metadata?.role as UserRole) || "CLIENT",
            permissions:
              DEFAULT_PERMISSIONS[(session.user.user_metadata?.role as UserRole) || "CLIENT"],
            createdAt: new Date(session.user.created_at),
            updatedAt: new Date(session.user.updated_at || session.user.created_at),
          };
          setUser(clientUser);
        }
      } catch (error) {
        console.error("Failed to initialize Supabase auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSupabaseAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (accounts.length > 0) return; // Entra ID takes priority

      if (session?.user) {
        const clientUser: AuthUser = {
          id: session.user.id,
          email: session.user.email || "",
          name: session.user.user_metadata?.name || session.user.email || "",
          role: (session.user.user_metadata?.role as UserRole) || "CLIENT",
          permissions:
            DEFAULT_PERMISSIONS[(session.user.user_metadata?.role as UserRole) || "CLIENT"],
          createdAt: new Date(session.user.created_at),
          updatedAt: new Date(session.user.updated_at || session.user.created_at),
        };
        setUser(clientUser);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [accounts]);

  const loginWithEntraId = async () => {
    setIsLoading(true);
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Entra ID login failed:", error);
      setIsLoading(false);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      if (data.user) {
        const clientUser: AuthUser = {
          id: data.user.id,
          email: data.user.email || "",
          name: data.user.user_metadata?.name || data.user.email || "",
          role: (data.user.user_metadata?.role as UserRole) || "CLIENT",
          permissions:
            DEFAULT_PERMISSIONS[(data.user.user_metadata?.role as UserRole) || "CLIENT"],
          createdAt: new Date(data.user.created_at),
          updatedAt: new Date(data.user.updated_at || data.user.created_at),
        };
        setUser(clientUser);
      }
    } catch (error) {
      console.error("Email login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role: "CLIENT" },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (accounts.length > 0) {
        await instance.logoutRedirect({ postLogoutRedirectUri: "/" });
      } else {
        await supabase.auth.signOut();
      }
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  const hasPermission = (permissions: Permission | Permission[]): boolean => {
    if (!user) return false;
    const permArray = Array.isArray(permissions) ? permissions : [permissions];
    return permArray.some((perm) => user.permissions.includes(perm));
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    loginWithEntraId,
    loginWithEmail,
    logout,
    hasRole,
    hasPermission,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
