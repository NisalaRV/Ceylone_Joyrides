import siteConfig from '../config/siteConfig.js';

/** Strip everything except digits and any leading "00" international prefix. */
export function normalizeWhatsAppNumber(value = '') {
  let digits = String(value).replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  return digits;
}

/** A usable WhatsApp number is 8–15 digits including the country code, not starting with 0. */
export function isValidWhatsAppNumber(value) {
  return /^[1-9]\d{7,14}$/.test(normalizeWhatsAppNumber(value));
}

export function isWhatsAppConfigured() {
  return isValidWhatsAppNumber(siteConfig.whatsappNumber);
}

export function hasEmail() {
  return /^\S+@\S+\.\S+$/.test(siteConfig.email || '');
}

/** https://wa.me/NUMBER?text=ENCODED — returns '' if no valid number is configured. */
export function buildWhatsAppUrl(message = '') {
  if (!isWhatsAppConfigured()) return '';
  const number = normalizeWhatsAppNumber(siteConfig.whatsappNumber);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Link for "Chat on WhatsApp" buttons. Falls back to the contact page when unconfigured. */
export function whatsappLinkProps(message = siteConfig.whatsappGreeting) {
  const url = buildWhatsAppUrl(message);
  if (url) return { href: url, external: true };
  return { to: '/contact' };
}

export function buildMailtoUrl(subject, body) {
  if (!hasEmail()) return '';
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Open WhatsApp in a new tab. Must be called directly from a user action
 * (e.g. a form submit handler) so browsers do not block it.
 * Returns { url, opened } — `opened` is false if the popup was blocked.
 */
export function openWhatsApp(message) {
  const url = buildWhatsAppUrl(message);
  if (!url) return { url: '', opened: false };
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  // With "noopener" some browsers return null even on success, so we always
  // show a clickable fallback link alongside the notice.
  return { url, opened: Boolean(win) };
}

export function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function validPhone(value) {
  const digits = value.replace(/\D/g, '');
  return /^[+\d\s\-()]+$/.test(value.trim()) && digits.length >= 7 && digits.length <= 15;
}

/** yyyy-mm-dd for today in the visitor's local time zone (used as the <input type="date"> min). */
export function todayISO() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

export function formatDateNice(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
