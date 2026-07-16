// Analytics and monitoring setup
/* eslint-disable @typescript-eslint/no-explicit-any */

// Google Analytics 4 integration
export const analytics = {
  // Initialize GA4
  initialize(measurementId: string): void {
    if (typeof window === "undefined") return;

    // Create script tag for GA4
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: unknown[]): void {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;
    gtag("js", new Date());
    gtag("config", measurementId);
  },

  // Track page view
  pageView(path: string): void {
    if (typeof window === "undefined") return;
    const gtag = (window as any).gtag;
    if (gtag) {
      gtag("event", "page_view", {
        page_path: path,
        page_title: document.title,
      });
    }
  },

  // Track custom event
  trackEvent(eventName: string, eventData?: Record<string, unknown>): void {
    if (typeof window === "undefined") return;
    const gtag = (window as any).gtag;
    if (gtag) {
      gtag("event", eventName, eventData);
    }
  },

  // Track conversion
  trackConversion(conversionId: string): void {
    this.trackEvent("conversion", {
      conversion_id: conversionId,
      value: 1,
    });
  },
};

// Sentry error tracking (if configured)
export const errorTracking = {
  initialize(dsn: string, options?: Record<string, unknown>): void {
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://browser.sentry-cdn.com/7.0.0/bundle.min.js";
    script.integrity =
      "sha384-bbNLvxWmvX1e7JNsv2Iy1JsaRkz1gPYp7ZP24jkQzJfW7mq5WZ5dznM5uq0XKc5F";
    script.crossOrigin = "anonymous";
    script.async = true;

    script.onload = () => {
      const Sentry = (window as any).Sentry;
      if (Sentry) {
        Sentry.init({
          dsn,
          integrations: [new Sentry.Replay()],
          tracesSampleRate: 1.0,
          replaysSessionSampleRate: 0.1,
          replaysOnErrorSampleRate: 1.0,
          ...options,
        });
      }
    };

    document.head.appendChild(script);
  },

  captureException(error: Error): void {
    const Sentry = (window as any).Sentry;
    if (Sentry) {
      Sentry.captureException(error);
    }
  },

  captureMessage(message: string, level: "fatal" | "error" | "warning" | "info" = "info"): void {
    const Sentry = (window as any).Sentry;
    if (Sentry) {
      Sentry.captureMessage(message, level);
    }
  },
};

// Performance monitoring
export const performanceMonitoring = {
  // Measure page load time
  getPageLoadTime(): number {
    if (typeof window === "undefined") return 0;
    const perfData = window.performance.timing;
    return perfData.loadEventEnd - perfData.navigationStart;
  },

  // Measure specific metric
  measureMetric(name: string, startMark: string, endMark: string): number {
    if (typeof window === "undefined") return 0;
    try {
      window.performance.measure(name, startMark, endMark);
      const measure = window.performance.getEntriesByName(name)[0];
      return measure.duration;
    } catch {
      return 0;
    }
  },

  // Report Web Vitals
  reportWebVitals(): void {
    if (typeof window === "undefined") return;

    // Largest Contentful Paint
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntryWithTime;
      analytics.trackEvent("web_vital_lcp", {
        value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
      });
    });

    observer.observe({ entryTypes: ["largest-contentful-paint"] });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as LayoutShiftEntry;
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value;
          analytics.trackEvent("web_vital_cls", {
            value: Math.round(clsValue * 1000),
          });
        }
      }
    });

    clsObserver.observe({ entryTypes: ["layout-shift"] });
  },
};

interface PerformanceEntryWithTime extends PerformanceEntry {
  renderTime?: number;
  loadTime?: number;
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

// User behavior tracking
export class BehaviorTracker {
  private pageStartTime: number = Date.now();
  private isUserActive: boolean = true;

  constructor() {
    this.setupActivityTracking();
  }

  private setupActivityTracking(): void {
    if (typeof window === "undefined") return;

    const events = ["mousedown", "keydown", "scroll", "touchstart"];

    events.forEach((event) => {
      window.addEventListener(event, () => {
        this.isUserActive = true;
      });
    });

    // Track inactivity
    setInterval(() => {
      if (this.isUserActive) {
        this.isUserActive = false;
      }
    }, 30000);
  }

  trackTimeOnPage(): number {
    return Date.now() - this.pageStartTime;
  }

  trackEvent(eventName: string, properties?: Record<string, unknown>): void {
    analytics.trackEvent(eventName, {
      ...properties,
      timeOnPage: this.trackTimeOnPage(),
      userActive: this.isUserActive,
    });
  }
}
