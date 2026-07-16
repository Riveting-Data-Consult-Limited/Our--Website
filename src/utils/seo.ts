// SEO utilities and helpers

export const seoDefaults = {
  siteName: "Riveting Data Consult",
  siteUrl: "https://riveting-group.com.ng",
  defaultImage: "https://riveting-group.com.ng/og-image.png",
  defaultDescription:
    "Riveting Data Consult Limited delivers technology, data analytics, automation and Microsoft training services for startups, SMEs and institutions.",
  twitterHandle: "@riveringdataug",
};

// Generate Schema.org structured data
export const generateSchema = (type: string, data: Record<string, unknown>) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    name: seoDefaults.siteName,
    url: seoDefaults.siteUrl,
  };

  return JSON.stringify({ ...baseSchema, ...data });
};

// Organization schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Riveting Data Consult Limited",
  url: seoDefaults.siteUrl,
  logo: `${seoDefaults.siteUrl}/logo.png`,
  description: seoDefaults.defaultDescription,
  address: {
    "@type": "PostalAddress",
    addressCountry: "NG",
    addressLocality: "Lagos",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Sales",
    telephone: "+2347068871897",
    email: "cchukwuwike@riveting-group.com.ng",
  },
  sameAs: [
    "https://ng.linkedin.com/company/riveting-data-consult-rdc",
  ],
};

// Blog post schema
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image?: string;
  content: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: article.title,
  description: article.description,
  image: article.image || seoDefaults.defaultImage,
  datePublished: article.publishedDate,
  dateModified: article.modifiedDate || article.publishedDate,
  author: {
    "@type": "Person",
    name: article.author,
  },
  publisher: {
    "@type": "Organization",
    name: seoDefaults.siteName,
    logo: {
      "@type": "ImageObject",
      url: `${seoDefaults.siteUrl}/logo.png`,
    },
  },
});

// Product/Service schema
export const generateProductSchema = (product: {
  name: string;
  description: string;
  image?: string;
  price: number;
  currency?: string;
}) => ({
  "@context": "https://schema.org/",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.image || seoDefaults.defaultImage,
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: product.currency || "NGN",
  },
});

// Breadcrumb schema
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// SEO-friendly URL slug generation
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// Canonical URL builder
export const getCanonicalUrl = (path: string): string => {
  return `${seoDefaults.siteUrl}${path}`;
};

// Open Graph image URL builder
export const getOGImageUrl = (imagePath?: string): string => {
  if (!imagePath) return seoDefaults.defaultImage;
  if (imagePath.startsWith("http")) return imagePath;
  return `${seoDefaults.siteUrl}${imagePath}`;
};
