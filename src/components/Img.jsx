import { useState } from 'react';
import { photo } from '../data/images.js';

/**
 * Responsive, lazy-loaded image with a themed gradient fallback.
 * Pass either `image={{ id, alt }}` (from the data files) or `src` + `alt`.
 * `src` / `id` can be an Unsplash photo ID or a path such as /images/photo.jpg.
 */
export default function Img({
  image,
  src,
  alt,
  width = 1400,
  sizes = '100vw',
  eager = false,
  className = '',
  position = '50% 50%',
}) {
  const [failed, setFailed] = useState(false);
  const source = src ?? image?.id ?? '';
  const text = alt ?? image?.alt ?? '';
  const isLocalOrUrl = source.startsWith('/') || source.startsWith('http');

  if (!source || failed) {
    return (
      <div
        role="img"
        aria-label={text}
        className={`h-full w-full bg-gradient-to-br from-forest via-midnight-700 to-midnight ${className}`}
      >
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(213,180,119,0.28),transparent_55%)]" />
      </div>
    );
  }

  const srcSet = isLocalOrUrl
    ? undefined
    : [480, 800, 1200, 1800].map((w) => `${photo(source, w)} ${w}w`).join(', ');

  return (
    <img
      src={photo(source, width)}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={text}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={eager ? 'high' : undefined}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      style={{ objectPosition: position }}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
