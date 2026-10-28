import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import siteConfig from '../config/siteConfig.js';
import { photo } from '../data/images.js';

/** Per-page title, description and Open Graph tags. */
export default function Seo({ title, description }) {
  const { pathname } = useLocation();
  const base = (siteConfig.siteUrl || '').replace(/\/$/, '');
  const url = base ? `${base}${pathname}` : undefined;
  const ogImage = photo(siteConfig.heroImage.id, 1200);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
