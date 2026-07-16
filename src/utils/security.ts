import DOMPurify from "dompurify";

// CSRF Token Management
export const csrfToken = {
  generate(): string {
    const token = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem("csrf_token", token);
    return token;
  },

  get(): string {
    let token = sessionStorage.getItem("csrf_token");
    if (!token) {
      token = this.generate();
    }
    return token;
  },

  verify(token: string): boolean {
    const stored = sessionStorage.getItem("csrf_token");
    return stored === token && !!stored;
  },
};

// XSS Prevention with DOMPurify
export const sanitizer = {
  clean(dirty: string, options?: unknown): string {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: [
        "b",
        "i",
        "em",
        "strong",
        "a",
        "p",
        "br",
        "ul",
        "ol",
        "li",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "code",
        "pre",
        "img",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
      ...(options as Record<string, unknown>),
    } as Parameters<typeof DOMPurify.sanitize>[1]);
  },

  sanitizeHtml(html: string): string {
    return this.clean(html);
  },

  sanitizeUrl(url: string): string {
    try {
      const parsed = new URL(url);
      if (["http:", "https:"].includes(parsed.protocol)) {
        return url;
      }
    } catch {
      // Invalid URL
    }
    return "/";
  },

  escapeHtml(text: string): string {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
  },
};

// Input Validation
export const validator = {
  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  isValidPhone(phone: string): boolean {
    // Nigerian phone numbers: +234... or 0...
    const re = /^(\+234|0)[789]\d{9}$/;
    return re.test(phone.replace(/\s/g, ""));
  },

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  isValidSlug(slug: string): boolean {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  },

  minLength(text: string, min: number): boolean {
    return text.trim().length >= min;
  },

  maxLength(text: string, max: number): boolean {
    return text.length <= max;
  },
};

// Rate Limiting (Client-side)
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];

    // Remove old requests outside the time window
    const recentRequests = requests.filter((time) => now - time < this.windowMs);

    if (recentRequests.length >= this.maxRequests) {
      return false;
    }

    recentRequests.push(now);
    this.requests.set(key, recentRequests);
    return true;
  }

  reset(key: string): void {
    this.requests.delete(key);
  }
}

// Content Security Policy Headers (to be set server-side)
export const cspHeaders = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://*.microsoft.com https://login.microsoftonline.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};

// Secure Headers
export const secureHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "geolocation=(), microphone=(), camera=(), payment=(), usb=()",
};
