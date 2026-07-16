import { Helmet } from "react-helmet-async";

export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "business.business";
  twitterCard?: "summary" | "summary_large_image";
  noindex?: boolean;
  nofollow?: boolean;
  children?: React.ReactNode;
}

export function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
  noindex = false,
  nofollow = false,
  children,
}: SEOProps) {
  const fullTitle = title.includes("Riveting") ? title : `${title} | Riveting Data Consult`;
  const siteUrl = "https://riveting-group.com.ng";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content={`noindex${nofollow ? ", nofollow" : ""}`} />}

      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical || siteUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content="Riveting Data Consult" />

      {/* Twitter Tags */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      {ogImage && <meta property="twitter:image" content={ogImage} />}

      {/* Additional SEO */}
      <meta name="author" content="Riveting Data Consult Limited" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#020617" />

      {children}
    </Helmet>
  );
}
