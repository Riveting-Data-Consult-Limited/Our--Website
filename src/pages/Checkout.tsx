import { useState } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { AlertCircle, CheckCircle } from "lucide-react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export function Checkout() {
  const { user, isAuthenticated } = useAuth();
  const [cartItems] = useState<CartItem[]>([]); // TODO: Get from context/state
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    name: user?.name || "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    // TODO: Implement actual Stripe payment processing
    // For now, just simulate successful payment
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-slate-400 mb-6">Your order has been confirmed.</p>
          <a
            href="/portal"
            className="inline-flex items-center justify-center rounded-lg bg-sky-500 hover:bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition"
          >
            View Orders
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-bold text-white mb-12">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-red-400 mb-8">
                <AlertCircle className="h-5 w-5" />
                {error}
              </div>
            )}

            {cartItems.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center">
                <p className="text-slate-400">Your cart is empty. Add items to continue.</p>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Billing Information */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
                    <h2 className="text-xl font-semibold text-white mb-6">Billing Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 focus:border-sky-500 outline-none transition"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 focus:border-sky-500 outline-none transition"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
                    <h2 className="text-xl font-semibold text-white mb-6">Payment Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 focus:border-sky-500 outline-none transition"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Expiry
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 focus:border-sky-500 outline-none transition"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 focus:border-sky-500 outline-none transition"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full rounded-lg bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-4 text-lg font-semibold text-white transition"
                  >
                    {isProcessing ? "Processing..." : "Pay Now"}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sticky top-32">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              {cartItems.length === 0 ? (
                <p className="text-slate-400 text-sm">No items in cart</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6 pb-6 border-b border-slate-700">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">
                          {item.title} x {item.quantity}
                        </span>
                        <span className="font-semibold text-sky-400">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Subtotal</span>
                      <span className="text-slate-300">₦{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Tax (0%)</span>
                      <span className="text-slate-300">₦0</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold pt-4 border-t border-slate-700">
                      <span className="text-white">Total</span>
                      <span className="text-sky-400">₦{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
