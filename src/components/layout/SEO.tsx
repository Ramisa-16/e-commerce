import { Helmet, HelmetProvider } from 'react-helmet-async'

const defaultMeta = {
  title: 'ShopWave - E-Commerce Store',
  description:
    'Shop the latest deals on electronics, clothing, home goods, and more. Free shipping on orders over $50.',
  image: 'https://picsum.photos/seed/og-shopwave/1200/630',
}

interface SEOProps {
  title?: string
  description?: string
  image?: string
  canonical?: string
  type?: 'website' | 'product'
}

export function HelmetProviderWrapper({ children }: { children: React.ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>
}

export default function SEO({
  title,
  description,
  image,
  canonical,
  type = 'website',
}: SEOProps) {
  const pageTitle = title ? `${title} | ShopWave` : defaultMeta.title
  const metaDescription = description ?? defaultMeta.description
  const metaImage = image ?? defaultMeta.image

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="ShopWave" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Product-specific meta */}
      {type === 'product' && (
        <>
          <meta property="og:url" content={canonical} />
        </>
      )}
    </Helmet>
  )
}
