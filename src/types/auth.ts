// User roles for authorization
export type UserRole = "ADMIN" | "EMPLOYEE" | "PARTNER" | "CLIENT" | "ANONYMOUS";

// Permission types
export type Permission =
  | "manage_content"
  | "manage_users"
  | "manage_orders"
  | "manage_appointments"
  | "view_portal"
  | "view_reports"
  | "edit_settings"
  | "public_access";

// User authentication state
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  avatar?: string;
  entraId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Authentication context interface
export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithEntraId: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  hasPermission: (permission: Permission | Permission[]) => boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

// Entra ID configuration
export interface EntraIdConfig {
  clientId: string;
  tenantId: string;
  redirectUri: string;
  scopes: string[];
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Signup data
export interface SignupData {
  email: string;
  password: string;
  name: string;
  company?: string;
}
