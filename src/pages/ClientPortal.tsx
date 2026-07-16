import { useState } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { User, ShoppingCart, Calendar, MessageSquare, FileText } from "lucide-react";
import { ClientProfile } from "@/components/ClientProfile";
import { OrderHistory } from "@/components/OrderHistory";
import { AppointmentBooking } from "@/components/AppointmentBooking";

type PortalTab = "profile" | "orders" | "appointments" | "tickets" | "resources";

export function ClientPortal() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<PortalTab>("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "tickets", label: "Support", icon: MessageSquare },
    { id: "resources", label: "Resources", icon: FileText },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-7xl px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">Welcome, {user?.name}!</h1>
          <p className="mt-2 text-slate-400">Manage your account, orders, and appointments</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-slate-800 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition border-b-2 whitespace-nowrap ${
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

        {/* Tab Content */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
          {activeTab === "profile" && <ClientProfile />}
          {activeTab === "orders" && <OrderHistory />}
          {activeTab === "appointments" && <AppointmentBooking />}
          {activeTab === "tickets" && <SupportTicketsTab />}
          {activeTab === "resources" && <ResourcesTab />}
        </div>
      </main>
    </div>
  );
}

function SupportTicketsTab() {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold text-white mb-2">Support Tickets</h2>
      <p className="text-slate-400">Manage your support requests (coming soon)</p>
    </div>
  );
}

function ResourcesTab() {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold text-white mb-2">Resources</h2>
      <p className="text-slate-400">Download invoices, contracts, and documentation (coming soon)</p>
    </div>
  );
}
