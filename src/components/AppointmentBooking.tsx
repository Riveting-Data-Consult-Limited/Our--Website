import { useState, useEffect } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { appointmentsApi, servicesApi, Appointment, Service } from "@/api/cms";
import { Calendar, Clock, AlertCircle, Plus } from "lucide-react";

export function AppointmentBooking() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    service_id: "",
    scheduled_at: "",
    notes: "",
  });

  useEffect(() => {
    if (!user?.id) return;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [appts, svcs] = await Promise.all([
          appointmentsApi.getForClient(user.id),
          servicesApi.getAll(),
        ]);
        setAppointments(appts);
        setServices(svcs);
      } catch (err) {
        console.error("Failed to load appointments:", err);
        setError("Failed to load appointments.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user?.id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !formData.service_id || !formData.scheduled_at) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const newAppointment = await appointmentsApi.create({
        client_id: user.id,
        service_id: formData.service_id,
        scheduled_at: formData.scheduled_at,
        notes: formData.notes || undefined,
        status: "pending",
      });
      setAppointments((prev) => [newAppointment, ...prev]);
      setFormData({ service_id: "", scheduled_at: "", notes: "" });
      setIsBooking(false);
    } catch (err) {
      console.error("Failed to book appointment:", err);
      setError("Failed to book appointment.");
    }
  };

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "completed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  if (isLoading) {
    return <p className="text-slate-400">Loading appointments...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Appointments</h2>
        <button
          onClick={() => setIsBooking(!isBooking)}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition"
        >
          <Plus className="h-4 w-4" />
          Book Appointment
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-red-400">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {isBooking && (
        <form
          onSubmit={handleBooking}
          className="rounded-lg border border-slate-700 bg-slate-950/80 p-6 space-y-4"
        >
          <h3 className="text-lg font-semibold text-white">Schedule New Appointment</h3>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Service</label>
            <select
              value={formData.service_id}
              onChange={(e) => setFormData((prev) => ({ ...prev, service_id: e.target.value }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 focus:border-sky-500 outline-none transition"
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                  {service.price && ` - ₦${service.price}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Date & Time</label>
            <input
              type="datetime-local"
              value={formData.scheduled_at}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, scheduled_at: e.target.value }))
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 focus:border-sky-500 outline-none transition"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 focus:border-sky-500 outline-none transition resize-none"
              rows={3}
              placeholder="Any special requests or notes for the appointment..."
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsBooking(false)}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-sky-500 hover:bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition"
            >
              Book Appointment
            </button>
          </div>
        </form>
      )}

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No Appointments</h3>
          <p className="text-slate-400">Book your first appointment today.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="rounded-lg border border-slate-800 bg-slate-950/80 p-6 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">Service Appointment</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(appointment.scheduled_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(appointment.scheduled_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
              {appointment.notes && (
                <p className="text-sm text-slate-400 border-t border-slate-800 pt-4 mt-4">
                  <span className="font-medium text-slate-300">Notes:</span> {appointment.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
