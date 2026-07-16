// Accessibility utilities and helpers

// Focus management
export const focusManager = {
  trap(element: HTMLElement): void {
    const focusableElements = element.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    });
  },

  release(element: HTMLElement): void {
    element.removeEventListener("keydown", () => {});
  },
};

// Keyboard navigation
export const keyboard = {
  isEnter(e: React.KeyboardEvent): boolean {
    return e.key === "Enter";
  },

  isSpace(e: React.KeyboardEvent): boolean {
    return e.key === " ";
  },

  isEscape(e: React.KeyboardEvent): boolean {
    return e.key === "Escape";
  },

  isArrowUp(e: React.KeyboardEvent): boolean {
    return e.key === "ArrowUp";
  },

  isArrowDown(e: React.KeyboardEvent): boolean {
    return e.key === "ArrowDown";
  },

  isArrowLeft(e: React.KeyboardEvent): boolean {
    return e.key === "ArrowLeft";
  },

  isArrowRight(e: React.KeyboardEvent): boolean {
    return e.key === "ArrowRight";
  },
};

// Skip to main content
export const createSkipLink = (): HTMLAnchorElement => {
  const link = document.createElement("a");
  link.href = "#main";
  link.className =
    "sr-only focus:not-sr-only absolute top-0 left-0 bg-sky-500 text-white px-4 py-2 z-50";
  link.textContent = "Skip to main content";
  return link;
};

// Screen reader only class (for Tailwind)
export const srOnlyClasses =
  "sr-only absolute w-1 h-1 p-0 -m-1 overflow-hidden border-0 whitespace-nowrap";

// ARIA labels and descriptions
export const ariaLabels = {
  button: (label: string) => ({ "aria-label": label }),
  link: (label: string) => ({ "aria-label": label }),
  img: (alt: string) => ({ alt, role: "img" }),
  button_with_icon: (label: string) => ({
    "aria-label": label,
    title: label,
  }),
};

// Color contrast checker (WCAG AA - 4.5:1 for normal text, 3:1 for large text)
export const contrastRatio = {
  getRelativeLuminance(rgb: string): number {
    const [r, g, b] = rgb.match(/\d+/g)?.map(Number) || [0, 0, 0];
    const [rs, gs, bs] = [r, g, b].map((c) => {
      const s = c / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  calculate(color1: string, color2: string): number {
    const l1 = this.getRelativeLuminance(color1);
    const l2 = this.getRelativeLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  },

  isWCAGAA(ratio: number): boolean {
    return ratio >= 4.5; // Normal text
  },

  isWCAGAALarge(ratio: number): boolean {
    return ratio >= 3; // Large text (18pt+)
  },
};

// Announce to screen readers
export const announceToScreenReader = (message: string, priority: "polite" | "assertive" = "polite"): void => {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", priority);
  announcement.className = srOnlyClasses;
  announcement.textContent = message;
  document.body.appendChild(announcement);

  // Remove after announcement is read
  setTimeout(() => {
    announcement.remove();
  }, 1000);
};

// Semantic HTML helpers
export const semantic = {
  // Returns proper heading level based on nesting depth
  getHeadingLevel(depth: number): 1 | 2 | 3 | 4 | 5 | 6 {
    return Math.max(1, Math.min(6, depth)) as 1 | 2 | 3 | 4 | 5 | 6;
  },

  // Validates page structure
  validatePageStructure(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const hasH1 = document.querySelector("h1");

    if (!hasH1) {
      errors.push("Page should have exactly one H1 heading");
    }

    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    for (let i = 1; i < headings.length; i++) {
      const current = parseInt(headings[i].tagName[1]);
      const previous = parseInt(headings[i - 1].tagName[1]);
      if (current > previous + 1) {
        errors.push(`Heading structure skipped from H${previous} to H${current}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },
};
