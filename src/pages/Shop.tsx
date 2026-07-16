import { useState, useEffect } from "react";
import { servicesApi, Service } from "@/api/cms";
import { ShoppingCart, AlertCircle } from "lucide-react";

export function Shop() {
  const [services, setServices] = useState<Service[]>([]);
  const [cart, setCart] = useState<(Service & { quantity: number })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        const data = await servicesApi.getAll();
        setServices(data);
      } catch (err) {
        console.error("Failed to load services:", err);
        setError("Failed to load services.");
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  const addToCart = (service: Service) => {
    const existing = cart.find((item) => item.id === service.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...service, quantity: 1 }]);
    }
  };

  const removeFromCart = (serviceId: string) => {
    setCart(cart.filter((item) => item.id !== serviceId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4">Services & Products</h1>
            <p className="text-lg text-slate-400">
              Browse our offerings and add items to your cart
            </p>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative rounded-lg bg-sky-500 hover:bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition inline-flex items-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-red-400 mb-8">
            <AlertCircle className="h-5 w-5" />
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Services Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <p className="text-slate-400">Loading services...</p>
            ) : services.length === 0 ? (
              <p className="text-slate-400">No services available.</p>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 hover:border-sky-500/40 transition flex flex-col"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 flex-grow">{service.description}</p>
                    {service.category && (
                      <p className="text-xs text-sky-400 font-medium mb-4">{service.category}</p>
                    )}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      {service.price && (
                        <p className="text-2xl font-bold text-sky-400">
                          ₦{service.price.toLocaleString()}
                        </p>
                      )}
                      <button
                        onClick={() => addToCart(service)}
                        className="rounded-lg bg-sky-500 hover:bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          {showCart && (
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sticky top-32">
                <h2 className="text-xl font-semibold text-white mb-4">Shopping Cart</h2>
                {cart.length === 0 ? (
                  <p className="text-slate-400 text-sm">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-lg bg-slate-950/80 border border-slate-700 p-4"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-white text-sm">{item.title}</h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">
                              Qty: {item.quantity}
                            </span>
                            {item.price && (
                              <span className="font-semibold text-sky-400">
                                ₦{(item.price * item.quantity).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-700 pt-4 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-300 font-medium">Total:</span>
                        <span className="text-2xl font-bold text-sky-400">
                          ₦{cartTotal.toLocaleString()}
                        </span>
                      </div>
                      <button className="w-full rounded-lg bg-sky-500 hover:bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition">
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
