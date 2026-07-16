import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [authMethod, setAuthMethod] = useState<"email" | "entra">("email");

  const navigate = useNavigate();
  const { loginWithEmail, loginWithEntraId, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/portal");
    return null;
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await loginWithEmail(email, password);
      navigate("/portal");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEntraLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      await loginWithEntraId();
      navigate("/portal");
    } catch (err) {
      setError("Failed to login with Microsoft Entra ID");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-8 shadow-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="mt-2 text-slate-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Entra ID Login */}
          <button
            onClick={handleEntraLogin}
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-3 font-semibold text-white transition mb-4"
          >
            {isLoading && authMethod === "entra" ? "Signing in..." : "Sign in with Microsoft"}
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-900 px-2 text-slate-400">or</span>
            </div>
          </div>

          {/* Email Login Form */}
          {authMethod === "email" ? (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-sky-500 hover:bg-sky-600 disabled:opacity-50 px-4 py-3 font-semibold text-white transition"
              >
                {isLoading ? "Signing in..." : "Sign in with Email"}
              </button>
            </form>
          ) : (
            <button
              onClick={() => setAuthMethod("email")}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-3 font-semibold text-white transition"
            >
              Back to Email Login
            </button>
          )}

          {/* Footer */}
          <div className="mt-6 space-y-2 text-center text-sm text-slate-400">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="text-sky-400 hover:text-sky-300">
                Sign up
              </a>
            </p>
            <p>
              <a href="/" className="text-sky-400 hover:text-sky-300">
                Back to home
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
