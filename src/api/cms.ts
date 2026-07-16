import { supabase } from "@/config/supabase";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  author_id: string;
  status: "draft" | "published";
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  price?: number;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  content: string;
  avatar?: string;
  rating: number;
  created_at: string;
}

export interface Appointment {
  id: string;
  client_id: string;
  service_id: string;
  scheduled_at: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  client_id: string;
  total: number;
  stripe_payment_id?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  created_at: string;
  updated_at: string;
}

// Blog Posts API
export const postsApi = {
  async getPublished(limit = 10, offset = 0) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);
    if (error) throw error;
    return data as Post[];
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) throw error;
    return data as Post;
  },

  async create(post: Omit<Post, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("posts")
      .insert([post])
      .select()
      .single();
    if (error) throw error;
    return data as Post;
  },

  async update(id: string, updates: Partial<Post>) {
    const { data, error } = await supabase
      .from("posts")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Post;
  },

  async delete(id: string) {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) throw error;
  },

  async publish(id: string) {
    return this.update(id, {
      status: "published",
      published_at: new Date().toISOString(),
    });
  },
};

// Pages API
export const pagesApi = {
  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) throw error;
    return data as Page;
  },

  async getAll() {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Page[];
  },

  async create(page: Omit<Page, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("pages")
      .insert([page])
      .select()
      .single();
    if (error) throw error;
    return data as Page;
  },

  async update(id: string, updates: Partial<Page>) {
    const { data, error } = await supabase
      .from("pages")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Page;
  },

  async delete(id: string) {
    const { error } = await supabase.from("pages").delete().eq("id", id);
    if (error) throw error;
  },
};

// Services API
export const servicesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Service[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data as Service;
  },

  async create(service: Omit<Service, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("services")
      .insert([service])
      .select()
      .single();
    if (error) throw error;
    return data as Service;
  },

  async update(id: string, updates: Partial<Service>) {
    const { data, error } = await supabase
      .from("services")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Service;
  },

  async delete(id: string) {
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw error;
  },
};

// Testimonials API
export const testimonialsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Testimonial[];
  },

  async create(testimonial: Omit<Testimonial, "id" | "created_at">) {
    const { data, error } = await supabase
      .from("testimonials")
      .insert([testimonial])
      .select()
      .single();
    if (error) throw error;
    return data as Testimonial;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },
};

// Appointments API
export const appointmentsApi = {
  async getForClient(clientId: string) {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("client_id", clientId)
      .order("scheduled_at", { ascending: false });
    if (error) throw error;
    return data as Appointment[];
  },

  async create(appointment: Omit<Appointment, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("appointments")
      .insert([appointment])
      .select()
      .single();
    if (error) throw error;
    return data as Appointment;
  },

  async update(id: string, updates: Partial<Appointment>) {
    const { data, error } = await supabase
      .from("appointments")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Appointment;
  },

  async cancel(id: string) {
    return this.update(id, { status: "cancelled" });
  },
};

// Orders API
export const ordersApi = {
  async getForClient(clientId: string) {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Order[];
  },

  async create(order: Omit<Order, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("orders")
      .insert([order])
      .select()
      .single();
    if (error) throw error;
    return data as Order;
  },

  async updatePaymentStatus(id: string, status: Order["status"], stripePaymentId?: string) {
    const updates: Partial<Order> = { status };
    if (stripePaymentId) updates.stripe_payment_id = stripePaymentId;
    return this.update(id, updates);
  },

  async update(id: string, updates: Partial<Order>) {
    const { data, error } = await supabase
      .from("orders")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data as Order;
  },
};
