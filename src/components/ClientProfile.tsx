import { useState } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { Edit2, Save } from "lucide-react";

export function ClientProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    company: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: Call API to update profile
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-2">{user?.name}</h2>
          <p className="text-slate-400">{user?.role} Account</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4" />
              Save
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4" />
              Edit
            </>
          )}
        </button>
      </div>

      {/* Profile Form */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 disabled:opacity-50 focus:border-sky-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 disabled:opacity-50 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 disabled:opacity-50 focus:border-sky-500 outline-none transition"
            placeholder="+234 700 000 0000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 disabled:opacity-50 focus:border-sky-500 outline-none transition"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-4 py-2 text-slate-100 disabled:opacity-50 focus:border-sky-500 outline-none transition resize-none"
            rows={3}
          />
        </div>
      </div>

      {isEditing && (
        <button
          onClick={handleSave}
          className="w-full rounded-lg bg-sky-500 hover:bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition"
        >
          Save Changes
        </button>
      )}

      {/* Account Info */}
      <div className="pt-8 border-t border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
        <div className="space-y-3 text-sm text-slate-400">
          <p>
            <span className="text-slate-300">Member Since:</span>{" "}
            {new Date(user?.createdAt || "").toLocaleDateString()}
          </p>
          <p>
            <span className="text-slate-300">Account Status:</span> Active
          </p>
        </div>
      </div>
    </div>
  );
}
