import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send } from 'lucide-react';
import Field, { inputClass, ariaFor } from './FormField.jsx';
import SubmissionNotice from './SubmissionNotice.jsx';
import { bookingContent } from '../data/content.js';
import { buildBookingMessage } from '../lib/messages.js';
import {
  buildMailtoUrl,
  isWhatsAppConfigured,
  openWhatsApp,
  todayISO,
  validEmail,
  validPhone,
} from '../lib/contact.js';

const NEEDS_END_DATE = ['Multi-Day Tour', 'Custom Sri Lanka Tour'];
const FIELD_ORDER = [
  'name',
  'phone',
  'email',
  'service',
  'startDate',
  'endDate',
  'travellers',
  'pickup',
  'dropoff',
];

const emptyValues = {
  name: '',
  phone: '',
  email: '',
  startDate: '',
  endDate: '',
  travellers: '2',
  pickup: '',
  dropoff: '',
  service: '',
  destination: '',
  vehicle: 'No preference',
  requests: '',
};

function validate(v) {
  const e = {};
  const today = todayISO();

  if (!v.name.trim()) e.name = 'Please enter your full name.';
  if (!v.phone.trim()) e.phone = 'Please enter a phone or WhatsApp number.';
  else if (!validPhone(v.phone)) e.phone = 'Enter a valid number, including your country code (e.g. +44 7700 900123).';
  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!validEmail(v.email)) e.email = 'Please enter a valid email address.';
  if (!v.service) e.service = 'Please choose the type of service.';

  if (!v.startDate) e.startDate = 'Please choose your travel start date.';
  else if (v.startDate < today) e.startDate = 'The start date cannot be in the past.';

  if (NEEDS_END_DATE.includes(v.service) && !v.endDate) {
    e.endDate = 'Please choose your end date for a multi-day or custom tour.';
  }
  if (v.endDate) {
    if (v.endDate < today) e.endDate = 'The end date cannot be in the past.';
    else if (v.startDate && v.endDate < v.startDate) e.endDate = 'The end date must be on or after the start date.';
  }

  const n = Number(v.travellers);
  if (!v.travellers) e.travellers = 'Please enter the number of travellers.';
  else if (!Number.isInteger(n) || n < 1 || n > 40) e.travellers = 'Enter a whole number between 1 and 40.';

  if (!v.pickup.trim()) e.pickup = 'Please tell us where you would like to be picked up.';
  if (v.service === 'Airport Transfer' && !v.dropoff.trim()) {
    e.dropoff = 'Please enter your drop-off location for an airport transfer.';
  }
  return e;
}

export default function BookingForm() {
  const [params] = useSearchParams();
  const presetService = bookingContent.serviceTypes.includes(params.get('service')) ? params.get('service') : '';
  const presetDestination = (params.get('destination') || '').slice(0, 80);

  const [values, setValues] = useState({ ...emptyValues, service: presetService, destination: presetDestination });
  const [touched, setTouched] = useState({});
  const [result, setResult] = useState(null);
  const noticeRef = useRef(null);

  const errors = validate(values);
  const today = todayISO();
  const showError = (name) => (touched[name] ? errors[name] : undefined);

  useEffect(() => {
    if (result && noticeRef.current) {
      noticeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      noticeRef.current.focus({ preventScroll: true });
    }
  }, [result]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setResult(null);
  };
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const props = (name) => {
    const id = `bk-${name}`;
    const err = showError(name);
    return {
      id,
      name,
      value: values[name],
      onChange,
      onBlur,
      className: inputClass('light', Boolean(err)),
      ...ariaFor(id, err),
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(emptyValues).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    const firstBad = FIELD_ORDER.find((k) => errors[k]);
    if (firstBad) {
      document.getElementById(`bk-${firstBad}`)?.focus();
      return;
    }

    const message = buildBookingMessage(values);
    const mailto = buildMailtoUrl(`Booking enquiry — ${values.service}`, message);

    if (isWhatsAppConfigured()) {
      // Opened directly inside the submit handler (a user action) so it is not blocked.
      const { url, opened } = openWhatsApp(message);
      setResult({ mode: 'whatsapp', url, opened, message, mailto });
    } else {
      setResult({ mode: 'unconfigured', url: '', opened: false, message, mailto });
    }
  };

  const endRequired = NEEDS_END_DATE.includes(values.service);
  const dropoffRequired = values.service === 'Airport Transfer';

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Booking enquiry form" className="space-y-6">
      <fieldset className="space-y-5">
        <legend className="mb-1 font-display text-xl text-midnight">Your details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="bk-name" label="Full name" required error={showError('name')} className="sm:col-span-2">
            <input type="text" autoComplete="name" placeholder="Your full name" {...props('name')} />
          </Field>
          <Field id="bk-phone" label="Contact number / WhatsApp" required error={showError('phone')}>
            <input type="tel" inputMode="tel" autoComplete="tel" placeholder="+44 7700 900123" {...props('phone')} />
          </Field>
          <Field id="bk-email" label="Email address" required error={showError('email')}>
            <input type="email" autoComplete="email" placeholder="you@example.com" {...props('email')} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="mb-1 font-display text-xl text-midnight">Your journey</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="bk-service" label="Service type" required error={showError('service')} className="sm:col-span-2">
            <select {...props('service')}>
              <option value="">Select a service…</option>
              {bookingContent.serviceTypes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <Field id="bk-startDate" label="Travel start date" required error={showError('startDate')}>
            <input type="date" min={today} {...props('startDate')} />
          </Field>
          <Field
            id="bk-endDate"
            label="Travel end date"
            required={endRequired}
            optionalText={!endRequired}
            hint={endRequired ? undefined : 'Only needed for multi-day trips.'}
            error={showError('endDate')}
          >
            <input type="date" min={values.startDate || today} {...props('endDate')} />
          </Field>

          <Field id="bk-travellers" label="Number of travellers" required error={showError('travellers')}>
            <input type="number" inputMode="numeric" min="1" max="40" step="1" {...props('travellers')} />
          </Field>
          <Field id="bk-vehicle" label="Vehicle preference" optionalText hint="Subject to availability.">
            <select {...props('vehicle')}>
              {bookingContent.vehiclePreferences.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </Field>

          <Field id="bk-pickup" label="Pickup location" required error={showError('pickup')}>
            <input type="text" autoComplete="off" placeholder="Airport, hotel or town" {...props('pickup')} />
          </Field>
          <Field
            id="bk-dropoff"
            label="Drop-off location"
            required={dropoffRequired}
            optionalText={!dropoffRequired}
            error={showError('dropoff')}
          >
            <input type="text" autoComplete="off" placeholder="Hotel, town or destination" {...props('dropoff')} />
          </Field>

          <Field
            id="bk-destination"
            label="Preferred destination"
            optionalText
            hint="Pick a suggestion or type your own."
            className="sm:col-span-2"
          >
            <input type="text" list="bk-destination-list" autoComplete="off" placeholder="e.g. Galle Fort, Ella, Sigiriya" {...props('destination')} />
            <datalist id="bk-destination-list">
              {bookingContent.destinations.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>
          </Field>

          <Field id="bk-requests" label="Special requests" optionalText className="sm:col-span-2">
            <textarea
              rows={4}
              placeholder="Interests, accessibility needs, child seats, flight number, anything that helps us plan…"
              {...props('requests')}
            />
          </Field>
        </div>
      </fieldset>

      <div className="space-y-4 pt-2">
        <button
          type="submit"
          className="group inline-flex min-h-[3.4rem] w-full items-center justify-center gap-3 rounded-full bg-gold-sheen px-8 py-4 text-base font-bold text-midnight shadow-gold transition duration-300 hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.98] sm:w-auto"
        >
          <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          Send Booking Enquiry
        </button>
        <p className="text-xs leading-relaxed text-midnight/60">
          Your details stay in your browser until you press send inside WhatsApp. We never send your information
          anywhere automatically. {bookingContent.side.note}
        </p>
      </div>

      <SubmissionNotice ref={noticeRef} result={result} whatsappNotice={bookingContent.successNotice} />
    </form>
  );
}
