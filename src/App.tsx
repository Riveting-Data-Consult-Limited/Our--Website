import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { lazy, Suspense } from "react";
import { msalConfig } from "@/config/msal";
import { AuthProvider } from "@/auth/AuthProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/middleware/ProtectedRoute";

// Lazy-loaded pages
const Home = lazy(() => import("@/pages/Home").then((m) => ({ default: m.Home })));
const Login = lazy(() => import("@/pages/Login").then((m) => ({ default: m.Login })));
const ClientPortal = lazy(() =>
  import("@/pages/ClientPortal").then((m) => ({ default: m.ClientPortal }))
);
const Blog = lazy(() => import("@/pages/Blog").then((m) => ({ default: m.Blog })));
const BlogPost = lazy(() =>
  import("@/pages/BlogPost").then((m) => ({ default: m.BlogPost }))
);
const AdminDashboard = lazy(() =>
  import("@/pages/AdminDashboard").then((m) => ({ default: m.AdminDashboard }))
);
const Shop = lazy(() => import("@/pages/Shop").then((m) => ({ default: m.Shop })));
const Checkout = lazy(() =>
  import("@/pages/Checkout").then((m) => ({ default: m.Checkout }))
);

const msalInstance = new PublicClientApplication(msalConfig);

if (msalInstance.getAllAccounts().length > 0) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const account = (event.payload as { account?: import("@azure/msal-browser").AccountInfo }).account;
    if (account) {
      msalInstance.setActiveAccount(account);
    }
  }
});

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-400">Loading page...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <MsalProvider instance={msalInstance}>
        <Router>
          <AuthProvider>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <AppLayout>
                    <Home />
                  </AppLayout>
                }
              />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route
                path="/portal"
                element={
                  <ProtectedRoute>
                    <Navigation />
                    <ClientPortal />
                  </ProtectedRoute>
                }
              />

              {/* Blog Routes */}
              <Route
                path="/blog"
                element={
                  <AppLayout>
                    <Blog />
                  </AppLayout>
                }
              />
              <Route
                path="/blog/:slug"
                element={
                  <AppLayout>
                    <BlogPost />
                  </AppLayout>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Navigation />
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Shop Routes */}
              <Route
                path="/shop"
                element={
                  <AppLayout>
                    <Shop />
                  </AppLayout>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Navigation />
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all 404 */}
              <Route
                path="*"
                element={
                  <AppLayout>
                    <div className="min-h-screen flex items-center justify-center bg-slate-950">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-white">404</h1>
                        <p className="text-slate-400 mt-2">Page not found</p>
                        <a
                          href="/"
                          className="mt-4 inline-block rounded-lg bg-sky-500 px-6 py-2 text-white hover:bg-sky-600 transition"
                        >
                          Back to home
                        </a>
                      </div>
                    </div>
                  </AppLayout>
                }
              />
            </Routes>
            </Suspense>
          </AuthProvider>
        </Router>
      </MsalProvider>
    </HelmetProvider>
  );
}
