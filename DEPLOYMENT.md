# Deployment Checklist & Guide

## Pre-Deployment Verification

### Code Quality
- [ ] ESLint passes: `npm run lint`
- [ ] TypeScript compiles: `npm run typecheck`
- [ ] Tests pass: `npm run test`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in dev mode: `npm run dev`

### Security
- [ ] No hardcoded secrets in code
- [ ] `.env.local` is git-ignored
- [ ] HTTPS enabled in production
- [ ] CORS headers configured
- [ ] CSP headers set (server-side)
- [ ] Secrets rotated (Azure Key Vault)

### Accessibility
- [ ] Pages have semantic HTML
- [ ] Form inputs have labels
- [ ] Images have alt text
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

### Performance
- [ ] Bundle size < 1MB (gzipped < 300KB)
- [ ] Lighthouse score > 80
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Route-based code splitting working

### SEO
- [ ] robots.txt configured
- [ ] sitemap.xml generated
- [ ] OpenGraph tags on key pages
- [ ] Schema.org markup present
- [ ] Meta descriptions under 160 chars
- [ ] Page titles under 60 chars

### Functionality
- [ ] Home page renders correctly
- [ ] Blog posts load and display
- [ ] Shop products load
- [ ] Authentication works (Entra ID + Email)
- [ ] Login/logout flow works
- [ ] Protected routes redirect correctly
- [ ] Forms submit without errors
- [ ] External links open correctly

### Mobile Responsive
- [ ] Viewport meta tag present
- [ ] Mobile layout works (375px width)
- [ ] Touch targets >= 44px
- [ ] No horizontal scrolling
- [ ] Font sizes readable

## Environment-Specific Configuration

### Development (localhost:3000)
```env
VITE_AZURE_CLIENT_ID=dev_client_id
VITE_AZURE_TENANT_ID=dev_tenant_id
VITE_AZURE_REDIRECT_URI=http://localhost:3000/login
VITE_SUPABASE_URL=https://dev-project.supabase.co
VITE_SUPABASE_ANON_KEY=dev_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:3001/api
```

### Staging
- Deploy to Azure App Service staging slot
- Use staging Supabase project
- Use staging Stripe keys (test mode)
- Enable Application Insights

### Production
- All secrets from Azure Key Vault
- Production Supabase project
- Production Stripe keys (live mode)
- Sentry monitoring enabled
- Google Analytics 4 tracking
- CDN for static assets (Azure Blob Storage)

## Deployment Steps

### 1. GitHub Pages Deployment (Automatic via Actions)
```bash
# Just push to main - GitHub Actions handles:
git push origin main
# 1. Linting & Type check
# 2. Unit tests
# 3. Build
# 4. Deploy to GitHub Pages
```

### 2. Azure App Service Deployment (Manual/CI-CD)
```bash
# Build Docker image
docker build -t riveting-data-consult:latest .

# Deploy to Azure
az container create \
  --resource-group my-resource-group \
  --name riveting-website \
  --image riveting-data-consult:latest \
  --environment-variables \
    VITE_AZURE_CLIENT_ID=$AZURE_CLIENT_ID \
    VITE_SUPABASE_URL=$SUPABASE_URL
```

## Rollback Procedure

### GitHub Pages
```bash
# Revert last commit
git revert HEAD~0
git push origin main
# Actions will automatically redeploy with previous build
```

### Azure App Service
```bash
# Via Azure Portal:
# 1. Go to App Service > Deployments > History
# 2. Click on previous deployment
# 3. Click "Redeploy"
```

## Monitoring Post-Deployment

### Error Tracking (Sentry)
- Monitor JavaScript errors
- Track API failures
- Set up alerts for critical errors

### Performance Monitoring
- Google Analytics 4: Track user behavior
- Lighthouse CI: Monitor performance metrics
- Application Insights: Azure infrastructure monitoring

### Uptime Monitoring
- Set up UptimeRobot for /health endpoint
- Configure alerts for downtime
- Monitor API response times

### Health Checks
```bash
# Check homepage
curl https://riveting-group.com.ng -I

# Check API health
curl https://riveting-group.com.ng/api/health

# Check SEO
curl -I https://riveting-group.com.ng/sitemap.xml
```

## Database Migrations

Before deploying with schema changes:
```bash
# 1. Create migration in Supabase
# 2. Test on staging database
# 3. Document changes
# 4. Deploy to production database
```

## Secrets Management

Secrets never committed to git. Store in:
- **Development**: `.env.local` (local only)
- **Staging**: Azure Key Vault (staging resource group)
- **Production**: Azure Key Vault (production resource group)

Rotate secrets:
```bash
# 1. Generate new secret
# 2. Update Azure Key Vault
# 3. Redeploy application
# 4. Revoke old secret
```

## Post-Deployment Testing

Run after each deployment:
```bash
npm run e2e  # Critical flows
npm run test # Unit tests
npm run lint # Code quality
```

### Manual Testing
1. [ ] Homepage loads
2. [ ] Navigation works
3. [ ] Blog posts load
4. [ ] Shop page works
5. [ ] Login redirects properly
6. [ ] Footer contact links work
7. [ ] Mobile responsive
8. [ ] Forms submit
9. [ ] Images load
10. [ ] No console errors

## Incident Response

### If Deployment Fails
1. Check GitHub Actions logs
2. Verify dependencies installed
3. Check build output
4. Rollback to last known good version
5. Fix issue and redeploy

### If Errors After Deployment
1. Check Sentry for errors
2. Monitor Application Insights
3. Check API/database connectivity
4. Review recent changes
5. Rollback if critical

## Version Control Best Practices

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and test
npm run lint
npm run test
npm run build

# Commit with clear message
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature

# After review and CI passes, merge to main
# GitHub Actions will automatically deploy
```

## Documentation Updates

After deployment, update:
- [ ] CHANGELOG.md with new features/fixes
- [ ] README.md if dependencies changed
- [ ] TESTING.md if test strategy changed
- [ ] API documentation if endpoints changed
