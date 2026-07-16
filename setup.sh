#!/bin/bash
# Quick Start - Phase 1 Enterprise Website

echo "🚀 Riveting Data Consult Enterprise Website - Phase 1 Setup"
echo "=========================================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --legacy-peer-deps
fi

echo ""
echo "✅ Setup complete! Here are your next steps:"
echo ""
echo "1. Create .env.local file:"
echo "   cp .env.example .env.local"
echo ""
echo "2. Fill in your credentials in .env.local:"
echo "   - VITE_AZURE_CLIENT_ID (from Azure App Registration)"
echo "   - VITE_AZURE_TENANT_ID (from Azure App Registration)"
echo "   - VITE_SUPABASE_URL (from Supabase project)"
echo "   - VITE_SUPABASE_ANON_KEY (from Supabase project)"
echo "   - VITE_STRIPE_PUBLISHABLE_KEY (from Stripe, optional)"
echo ""
echo "3. Start development server:"
echo "   npm run dev"
echo ""
echo "4. Open in browser:"
echo "   http://localhost:3000"
echo ""
echo "📚 For detailed setup guide, see: PHASE1_SETUP.md"
