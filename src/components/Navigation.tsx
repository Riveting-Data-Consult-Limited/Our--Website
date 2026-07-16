import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthProvider";

export function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-3 text-slate-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300 ring-1 ring-sky-500/20">
            RDC
          </div>
          <div>
            <p className="text-lg font-semibold leading-none">Riveting Data Consult</p>
            <p className="text-xs text-slate-400">Technology, data and strategy</p>
          </div>
        </Link>

        <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
          <a href="/#services" className="transition hover:text-white">
            Services
          </a>
          <Link to="/shop" className="transition hover:text-white">
            Shop
          </Link>
          <Link to="/blog" className="transition hover:text-white">
            Blog
          </Link>
          <a href="/#academy" className="transition hover:text-white">
            Academy
          </a>
          <a href="/#contact" className="transition hover:text-white">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden md:inline text-sm text-slate-400">
                {user?.email}
              </span>
              {user?.role === "ADMIN" && (
                <Link
                  to="/admin"
                  className="rounded-lg bg-purple-600 hover:bg-purple-700 px-4 py-2 text-sm font-semibold text-white transition"
                >
                  Admin
                </Link>
              )}
              <Link
                to="/portal"
                className="rounded-lg bg-sky-500 hover:bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition"
              >
                Portal
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-sky-500 hover:bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
