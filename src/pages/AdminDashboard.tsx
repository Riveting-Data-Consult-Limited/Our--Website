import { useState } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { Navigate } from "react-router-dom";
import {
  FileText,
  BookOpen,
  Package,
  MessageSquare,
  Users,
  Plus,
} from "lucide-react";

type AdminTab = "posts" | "pages" | "services" | "testimonials" | "users";

export function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("posts");

  // Check authorization
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  const tabs = [
    { id: "posts", label: "Blog Posts", icon: FileText },
    { id: "pages", label: "Pages", icon: BookOpen },
    { id: "services", label: "Services", icon: Package },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "users", label: "Users", icon: Users },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-7xl px-6 py-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
            <p className="mt-2 text-slate-400">Manage content and users</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
            <Plus className="h-5 w-5" />
            Add New
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition border-b-2 ${
                  activeTab === tab.id
                    ? "border-sky-500 text-white"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
          {activeTab === "posts" && <AdminPostsSection />}
          {activeTab === "pages" && <AdminPagesSection />}
          {activeTab === "services" && <AdminServicesSection />}
          {activeTab === "testimonials" && <AdminTestimonialsSection />}
          {activeTab === "users" && <AdminUsersSection />}
        </div>
      </main>
    </div>
  );
}

// Placeholder sections for each admin area
function AdminPostsSection() {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold text-white mb-2">Blog Posts</h2>
      <p className="text-slate-400">Create, edit, and manage blog posts (coming soon)</p>
    </div>
  );
}

function AdminPagesSection() {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold text-white mb-2">Pages</h2>
      <p className="text-slate-400">Manage static pages (coming soon)</p>
    </div>
  );
}

function AdminServicesSection() {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold text-white mb-2">Services</h2>
      <p className="text-slate-400">Manage your service offerings (coming soon)</p>
    </div>
  );
}

function AdminTestimonialsSection() {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold text-white mb-2">Testimonials</h2>
      <p className="text-slate-400">Manage client testimonials (coming soon)</p>
    </div>
  );
}

function AdminUsersSection() {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold text-white mb-2">Users</h2>
      <p className="text-slate-400">Manage user accounts and permissions (coming soon)</p>
    </div>
  );
}
