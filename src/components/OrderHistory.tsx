import { useState, useEffect } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { ordersApi, Order } from "@/api/cms";
import { Package, Download, AlertCircle } from "lucide-react";

export function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const data = await ordersApi.getForClient(user.id);
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
        setError("Failed to load orders.");
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [user?.id]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "failed":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      case "refunded":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  if (isLoading) {
    return <p className="text-slate-400">Loading orders...</p>;
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-red-400">
        <AlertCircle className="h-5 w-5" />
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-300 mb-2">No Orders Yet</h3>
        <p className="text-slate-400">You haven't made any purchases yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white mb-6">Order History</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-lg border border-slate-800 bg-slate-950/80 p-6 hover:border-slate-700 transition"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-white">Order #{order.id.slice(0, 8).toUpperCase()}</h3>
              <p className="text-sm text-slate-400 mt-1">
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                order.status
              )}`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-4">
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Total</p>
              <p className="text-xl font-bold text-sky-400">₦{order.total.toLocaleString()}</p>
            </div>
            {order.stripe_payment_id && (
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Payment ID</p>
                <p className="text-sm text-slate-300 font-mono">{order.stripe_payment_id.slice(0, 20)}...</p>
              </div>
            )}
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Updated</p>
              <p className="text-sm text-slate-300">
                {new Date(order.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-400 transition">
              <Download className="h-4 w-4" />
              Invoice
            </button>
            {order.status === "completed" && (
              <button className="inline-flex items-center gap-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-300 transition">
                View Details
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
