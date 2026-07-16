# Testing Guide

## Unit Tests (Vitest)

Run all unit tests:
```bash
npm run test
```

Watch mode:
```bash
npm run test -- --watch
```

Coverage report:
```bash
npm run test:coverage
```

UI mode:
```bash
npm run test:ui
```

### Test Files Location
- `src/**/*.test.ts` - Utility tests
- `src/**/*.test.tsx` - Component tests

### What's Tested
- **Security utilities**: XSS sanitization, input validation, rate limiting
- **SEO utilities**: Slug generation, schema generators, URL builders
- **Components**: BlogCard rendering and functionality

## Integration Tests (React Testing Library)

Tests are colocated with components as `*.test.tsx` files and test component behavior, props handling, and user interactions.

## E2E Tests (Playwright)

Run all E2E tests:
```bash
npm run e2e
```

UI mode (interactive):
```bash
npm run e2e:ui
```

### Test Coverage
- Homepage loading and navigation
- Blog listing and navigation
- Shop and cart functionality
- Login redirection for protected routes
- Responsive design on mobile
- Form validation
- Footer accessibility

### E2E Test Files
- `src/test/e2e/critical-flows.spec.ts` - Critical user journeys

## GitHub Actions CI/CD Pipeline

The workflow (`.github/workflows/deploy.yml`) runs:
1. **Lint**: ESLint code quality checks
2. **Type Check**: TypeScript compilation
3. **Unit Tests**: Vitest
4. **Build**: Production bundle (vite build)
5. **Deploy**: GitHub Pages deployment

### Pipeline Status
- Runs on every push to `main` and PR
- Required to pass before deployment
- Parallelized for fast feedback

## Pre-commit Checks

Before pushing, run locally:
```bash
npm run lint       # Fix with: npm run lint -- --fix
npm run typecheck  # Verify TypeScript
npm run test       # Run unit tests
npm run build      # Verify production build
```

## Performance Testing

Check Core Web Vitals:
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

Use Lighthouse in Chrome DevTools or:
```bash
npm run build  # Check bundle size warnings
```

## Security Testing

### Manual Checks
- Test XSS: Try injecting `<script>alert('xss')</script>` in forms
- Test CSRF: Verify tokens are validated
- Check HTTPS: All external calls use HTTPS

### Automated Checks
- ESLint catches security anti-patterns
- DOMPurify sanitizes user content
- Input validators check types

## Common Test Patterns

### Testing a Component
```typescript
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

test("renders correctly", () => {
  render(<MyComponent prop="value" />);
  expect(screen.getByText("Expected Text")).toBeInTheDocument();
});
```

### Testing Security Functions
```typescript
import { sanitizer, validator } from "@/utils/security";

test("sanitizes XSS", () => {
  const result = sanitizer.clean("<p>Safe</p><script>bad</script>");
  expect(result).toContain("<p>");
  expect(result).not.toContain("<script>");
});
```

### Testing SEO Utilities
```typescript
import { generateSlug } from "@/utils/seo";

test("generates valid slugs", () => {
  expect(generateSlug("Hello World!")).toBe("hello-world");
});
```

## Debugging Tests

### Vitest Debug
```bash
npm run test -- --inspect-brk --no-file-parallelism
```

### Playwright Debug
```bash
npx playwright test --debug
```

### React Testing Library Debug
Add in test:
```typescript
import { render, screen } from "@testing-library/react";
import { debug } from "@testing-library/react";

test("debug example", () => {
  const { container } = render(<MyComponent />);
  debug(container);  // Prints DOM to console
});
```

## Coverage Goals

- Utilities: 80%+ coverage (critical security/validation code)
- Components: 70%+ coverage (user-facing components)
- Overall: 60%+ coverage

Current gaps:
- E2E tests need more edge case coverage
- Component integration tests (with auth, routing)
- API layer testing (mocked Supabase calls)
