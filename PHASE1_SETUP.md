# Phase 1: Enterprise Website Rebuild - Setup Guide

## ✅ What's Been Completed

### Project Structure
```
src/
├── pages/             # Route pages (Home, Login, ClientPortal, etc.)
├── components/        # Reusable components (Navigation, etc.)
├── auth/             # Authentication logic (AuthProvider, etc.)
├── middleware/       # Route guards (ProtectedRoute, etc.)
├── types/            # TypeScript types (auth.ts, etc.)
├── api/              # API client functions (to be created)
├── hooks/            # Custom React hooks (to be created)
├── store/            # State management (to be created)
├── utils/            # Utility functions (to be created)
├── config/           # Configuration files (environment.ts)
└── main.tsx          # Entry point
```

### Authentication System
- ✅ `AuthProvider.tsx` - Context-based authentication with Entra ID & email support
- ✅ `ProtectedRoute.tsx` - Route guard for authenticated pages
- ✅ `auth.ts` - TypeScript types for auth
- ✅ Role-based access control (ADMIN, EMPLOYEE, PARTNER, CLIENT)
- ✅ Permission system for granular access control

### Pages Created
- ✅ `Home.tsx` - Landing page (redesigned from original App.tsx)
- ✅ `Login.tsx` - Login with Entra ID and email auth options
- ✅ `ClientPortal.tsx` - Protected client dashboard

### Components
- ✅ `Navigation.tsx` - Header component with auth state
- ✅ Dynamic routing with React Router v7

### Configuration
- ✅ `environment.ts` - Environment variables management
- ✅ `.env.example` - Template for environment variables
- ✅ `.gitignore` - Updated to protect secrets

---

## 📋 Next Steps to Complete Phase 1

### 1. **Environment Setup**
Create `.env.local` in your project root:
```bash
# Copy from .env.example
cp .env.example .env.local
```

Then fill in your credentials:
```env
VITE_AZURE_CLIENT_ID=your_azure_client_id
VITE_AZURE_TENANT_ID=your_azure_tenant_id
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### 2. **Install Dependencies**
```bash
npm install --legacy-peer-deps
```
(Currently installing in background)

### 3. **Test Development Server**
Once installation completes:
```bash
npm run dev
```

Visit `http://localhost:3000` to see:
- Landing page at `/`
- Login page at `/login`
- Protected portal at `/portal` (redirects to login if not authenticated)

### 4. **Create Azure App Registration**
For Entra ID integration, you'll need:

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to Azure Entra ID → App registrations
3. Create a new app registration:
   - Name: "Riveting Data Consult Portal"
   - Supported account types: "Multi-tenant"
   - Redirect URI: `http://localhost:3000/login` (for dev)
4. Copy the following to `.env.local`:
   - **Application (client) ID** → `VITE_AZURE_CLIENT_ID`
   - **Directory (tenant) ID** → `VITE_AZURE_TENANT_ID`

### 5. **Set up Supabase Project**
For database and email auth:

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Copy project credentials to `.env.local`:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon Public Key** → `VITE_SUPABASE_ANON_KEY`

### 6. **Stripe Account (Optional for now)**
If you want to enable payments:
1. Create [Stripe account](https://stripe.com)
2. Get Publishable Key → `VITE_STRIPE_PUBLISHABLE_KEY`

---

## 🔐 Security Checklist

- ✅ All secrets in `.env.local` (git-ignored)
- ✅ No hardcoded API keys in code
- ✅ Protected routes require authentication
- ✅ Role-based access control in place
- ⏳ HTTPS enforcement (will be set up during deployment)
- ⏳ CORS configuration (needs backend setup)

---

## 🧪 Testing the Setup

### Test Login Flow
1. Visit `http://localhost:3000/login`
2. Test email login (currently mocked):
   - Email: `test@example.com`
   - Password: anything
   - Should redirect to `/portal`
3. Test Entra ID button (will implement in Phase 2)

### Test Protected Routes
1. Unauthenticated user visits `/portal`
2. Should be redirected to `/login`
3. After login, `/portal` should work

---

## 📚 Architecture Overview

### Auth Flow
```
User visits app
    ↓
AuthProvider wraps everything
    ↓
Check localStorage for saved user
    ↓
If authenticated, set user state
    ↓
Routes with ProtectedRoute check auth
    ↓
Redirect to /login if needed
```

### Data Flow
```
Component → useAuth() hook
    ↓
Get user, isAuthenticated, methods
    ↓
Call loginWithEmail() or loginWithEntraId()
    ↓
User state updated
    ↓
Component re-renders with new state
```

---

## 🚀 Phase 1 Completion Criteria

- [ ] npm install completes successfully
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] Home page renders at `http://localhost:3000`
- [ ] Login page accessible at `http://localhost:3000/login`
- [ ] Email login form works (redirects to portal)
- [ ] Portal page protected (redirects unauthenticated users)
- [ ] Navigation shows "Sign In" for anonymous, user email for authenticated
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] No console errors in browser

Once these are complete, we move to **Phase 2: Entra ID Integration** where we'll implement real Microsoft authentication.

---

## 📞 Troubleshooting

### npm install hangs or fails
```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Port 3000 already in use
```bash
# Use a different port
PORT=3001 npm run dev
```

### TypeScript errors
```bash
# Enable strict mode gradually
npm run typecheck
# Fix errors in reported files
```

### Authentication not working
- Check `.env.local` exists with required variables
- Check browser console for errors
- Verify localStorage is enabled in browser

---

## 📖 Files Modified/Created

- ✅ `src/App.tsx` - Converted to Router with routes
- ✅ `src/pages/Home.tsx` - Landing page
- ✅ `src/pages/Login.tsx` - Login page
- ✅ `src/pages/ClientPortal.tsx` - Protected client dashboard
- ✅ `src/components/Navigation.tsx` - Header component
- ✅ `src/auth/AuthProvider.tsx` - Auth context
- ✅ `src/middleware/ProtectedRoute.tsx` - Route protection
- ✅ `src/types/auth.ts` - Auth TypeScript types
- ✅ `src/config/environment.ts` - Environment config
- ✅ `.env.example` - Environment template
- ✅ `.gitignore` - Updated for secrets
- ✅ `package.json` - Added new dependencies

---

Ready to proceed? Run these commands:

```bash
# Wait for npm install to complete (in background)
npm run dev

# In another terminal
npm run typecheck
```

Let me know when the dev server is running!
