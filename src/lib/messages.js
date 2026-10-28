import { formatDateNice } from './contact.js';
import siteConfig from '../config/siteConfig.js';

const line = (label, value) => (value && String(value).trim() ? `*${label}:* ${String(value).trim()}` : null);

/** Builds the WhatsApp text for a booking enquiry. Only filled-in fields are included. */
export function buildBookingMessage(v) {
  const rows = [
    `Hello ${siteConfig.name}, I would like to send a booking enquiry.`,
    '',
    line('Name', v.name),
    line('Phone / WhatsApp', v.phone),
    line('Email', v.email),
    '',
    line('Service', v.service),
    line('Start date', formatDateNice(v.startDate)),
    line('End date', formatDateNice(v.endDate)),
    line('Travellers', v.travellers),
    line('Pickup', v.pickup),
    line('Drop-off', v.dropoff),
    line('Preferred destination', v.destination),
    line('Vehicle preference', v.vehicle && v.vehicle !== 'No preference' ? v.vehicle : ''),
    line('Special requests', v.requests),
    '',
    'Please let me know about availability and next steps. Thank you!',
  ];
  return rows.filter((r) => r !== null).join('\n').replace(/\n{3,}/g, '\n\n');
}

export function buildContactMessage(v) {
  const rows = [
    `Hello ${siteConfig.name},`,
    '',
    line('Name', v.name),
    line('Email', v.email),
    line('Phone / WhatsApp', v.phone),
    line('Subject', v.subject),
    '',
    v.message.trim(),
  ];
  return rows.filter((r) => r !== null).join('\n').replace(/\n{3,}/g, '\n\n');
}
