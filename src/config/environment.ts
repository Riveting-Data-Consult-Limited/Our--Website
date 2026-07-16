// Azure/Entra ID Configuration
export const azureConfig = {
  clientId: import.meta.env.VITE_AZURE_CLIENT_ID || "",
  tenantId: import.meta.env.VITE_AZURE_TENANT_ID || "",
  redirectUri:
    import.meta.env.VITE_AZURE_REDIRECT_URI ||
    `${window.location.origin}/login`,
  scopes: ["openid", "profile", "email"],
};

// Supabase Configuration
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || "",
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
};

// Stripe Configuration
export const stripeConfig = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "",
};

// API Configuration
export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  timeout: 10000,
};

// App Configuration
export const appConfig = {
  name: "Riveting Data Consult",
  version: "1.0.0",
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Feature Flags
export const features = {
  enableEntraId: true,
  enableEmailAuth: true,
  enableStripe: true,
  enableCMS: true,
  enablePortal: true,
};
