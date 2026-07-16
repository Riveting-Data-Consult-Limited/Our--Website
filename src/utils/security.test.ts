import { describe, it, expect, beforeEach } from "vitest";
import { sanitizer, validator, RateLimiter } from "@/utils/security";

describe("Security Utilities", () => {
  describe("sanitizer", () => {
    it("should remove XSS script tags", () => {
      const dirty = '<p>Hello</p><script>alert("XSS")</script>';
      const clean = sanitizer.clean(dirty);
      expect(clean).not.toContain("<script>");
      expect(clean).toContain("<p>Hello</p>");
    });

    it("should allow safe HTML tags", () => {
      const dirty = "<p>Test <strong>bold</strong> <em>italic</em></p>";
      const clean = sanitizer.clean(dirty);
      expect(clean).toContain("<strong>");
      expect(clean).toContain("<em>");
    });

    it("should sanitize URLs", () => {
      expect(sanitizer.sanitizeUrl("https://example.com")).toBe("https://example.com");
      expect(sanitizer.sanitizeUrl("javascript:alert('xss')")).toBe("/");
      expect(sanitizer.sanitizeUrl("invalid-url")).toBe("/");
    });

    it("should escape HTML special characters", () => {
      const text = '<script>alert("XSS")</script>';
      const escaped = sanitizer.escapeHtml(text);
      expect(escaped).toContain("&lt;");
      expect(escaped).toContain("&gt;");
      expect(escaped).not.toContain("<script>");
    });
  });

  describe("validator", () => {
    it("should validate email addresses", () => {
      expect(validator.isValidEmail("test@example.com")).toBe(true);
      expect(validator.isValidEmail("invalid-email")).toBe(false);
      expect(validator.isValidEmail("test@")).toBe(false);
    });

    it("should validate Nigerian phone numbers", () => {
      expect(validator.isValidPhone("+2347068871897")).toBe(true);
      expect(validator.isValidPhone("07068871897")).toBe(true);
      expect(validator.isValidPhone("invalid")).toBe(false);
    });

    it("should validate URLs", () => {
      expect(validator.isValidUrl("https://example.com")).toBe(true);
      expect(validator.isValidUrl("not-a-url")).toBe(false);
    });

    it("should validate slugs", () => {
      expect(validator.isValidSlug("valid-slug")).toBe(true);
      expect(validator.isValidSlug("valid-slug-123")).toBe(true);
      expect(validator.isValidSlug("Invalid Slug!")).toBe(false);
    });

    it("should check string length", () => {
      expect(validator.minLength("hello", 5)).toBe(true);
      expect(validator.minLength("hi", 5)).toBe(false);
      expect(validator.maxLength("hello", 10)).toBe(true);
      expect(validator.maxLength("hello world", 5)).toBe(false);
    });
  });

  describe("RateLimiter", () => {
    let limiter: RateLimiter;

    beforeEach(() => {
      limiter = new RateLimiter(3, 1000);
    });

    it("should allow requests within limit", () => {
      expect(limiter.isAllowed("user1")).toBe(true);
      expect(limiter.isAllowed("user1")).toBe(true);
      expect(limiter.isAllowed("user1")).toBe(true);
    });

    it("should block requests exceeding limit", () => {
      limiter.isAllowed("user1");
      limiter.isAllowed("user1");
      limiter.isAllowed("user1");
      expect(limiter.isAllowed("user1")).toBe(false);
    });

    it("should track different users separately", () => {
      limiter.isAllowed("user1");
      limiter.isAllowed("user2");
      expect(limiter.isAllowed("user1")).toBe(true);
      expect(limiter.isAllowed("user2")).toBe(true);
    });

    it("should reset rate limit for a user", () => {
      limiter.isAllowed("user1");
      limiter.isAllowed("user1");
      limiter.isAllowed("user1");
      expect(limiter.isAllowed("user1")).toBe(false);

      limiter.reset("user1");
      expect(limiter.isAllowed("user1")).toBe(true);
    });
  });
});
