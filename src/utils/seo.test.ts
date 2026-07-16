import { describe, it, expect } from "vitest";
import {
  generateSlug,
  getCanonicalUrl,
  getOGImageUrl,
  generateArticleSchema,
  generateProductSchema,
  generateBreadcrumbSchema,
  seoDefaults,
} from "@/utils/seo";

describe("SEO Utilities", () => {
  describe("generateSlug", () => {
    it("should convert text to valid slug", () => {
      expect(generateSlug("Hello World")).toBe("hello-world");
      expect(generateSlug("Hello  Multiple   Spaces")).toBe("hello-multiple-spaces");
    });

    it("should remove special characters", () => {
      expect(generateSlug("Test @#$% Slug!")).toBe("test-slug");
    });

    it("should handle already-slugified text", () => {
      expect(generateSlug("hello-world")).toBe("hello-world");
    });
  });

  describe("getCanonicalUrl", () => {
    it("should build canonical URL", () => {
      const url = getCanonicalUrl("/blog/test-post");
      expect(url).toContain(seoDefaults.siteUrl);
      expect(url).toContain("/blog/test-post");
    });
  });

  describe("getOGImageUrl", () => {
    it("should return default image when not provided", () => {
      expect(getOGImageUrl()).toBe(seoDefaults.defaultImage);
    });

    it("should return absolute URL as-is", () => {
      const url = "https://example.com/image.png";
      expect(getOGImageUrl(url)).toBe(url);
    });

    it("should prepend site URL to relative paths", () => {
      const result = getOGImageUrl("/images/og.png");
      expect(result).toContain(seoDefaults.siteUrl);
      expect(result).toContain("/images/og.png");
    });
  });

  describe("schema generators", () => {
    it("should generate article schema", () => {
      const schema = generateArticleSchema({
        title: "Test Article",
        description: "Test description",
        author: "John Doe",
        publishedDate: "2026-07-16",
        content: "Article content",
      });

      expect(schema["@type"]).toBe("BlogPosting");
      expect(schema.headline).toBe("Test Article");
      expect(schema.author.name).toBe("John Doe");
    });

    it("should generate product schema", () => {
      const schema = generateProductSchema({
        name: "Test Product",
        description: "Test description",
        price: 1000,
        currency: "NGN",
      });

      expect(schema["@type"]).toBe("Product");
      expect(schema.name).toBe("Test Product");
      expect(schema.offers.price).toBe(1000);
    });

    it("should generate breadcrumb schema", () => {
      const items = [
        { name: "Home", url: seoDefaults.siteUrl },
        { name: "Blog", url: `${seoDefaults.siteUrl}/blog` },
      ];
      const schema = generateBreadcrumbSchema(items);

      expect(schema["@type"]).toBe("BreadcrumbList");
      expect(schema.itemListElement).toHaveLength(2);
      expect(schema.itemListElement[0].position).toBe(1);
    });
  });
});
