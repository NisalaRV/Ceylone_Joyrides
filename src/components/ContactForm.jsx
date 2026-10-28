import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import Field, { inputClass, ariaFor } from './FormField.jsx';
import SubmissionNotice from './SubmissionNotice.jsx';
import { buildContactMessage } from '../lib/messages.js';
import {
  buildMailtoUrl,
  hasEmail,
  isWhatsAppConfigured,
  openWhatsApp,
  validEmail,
  validPhone,
} from '../lib/contact.js';

const empty = { name: '', email: '', phone: '', subject: '', message: '' };
const ORDER = ['name', 'email', 'phone', 'subject', 'message'];

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your full name.';
  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!validEmail(v.email)) e.email = 'Please enter a valid email address.';
  if (!v.phone.trim()) e.phone = 'Please enter a WhatsApp or phone number.';
  else if (!validPhone(v.phone)) e.phone = 'Enter a valid number, including your country code.';
  if (!v.subject.trim()) e.subject = 'Please add a subject.';
  if (!v.message.trim()) e.message = 'Please write a short message.';
  else if (v.message.trim().length < 10) e.message = 'Please add a little more detail (at least 10 characters).';
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [touched, setTouched] = useState({});
  const [result, setResult] = useState(null);
  const noticeRef = useRef(null);

  const errors = validate(values);
  const showError = (n) => (touched[n] ? errors[n] : undefined);

  useEffect(() => {
    if (result && noticeRef.current) {
      noticeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      noticeRef.current.focus({ preventScroll: true });
    }
  }, [result]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
    setResult(null);
  };
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const props = (name) => {
    const id = `ct-${name}`;
    const err = showError(name);
    return { id, name, value: values[name], onChange, onBlur, className: inputClass('dark', Boolean(err)), ...ariaFor(id, err) };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched(ORDER.reduce((a, k) => ({ ...a, [k]: true }), {}));
    const bad = ORDER.find((k) => errors[k]);
    if (bad) {
      document.getElementById(`ct-${bad}`)?.focus();
      return;
    }

    const message = buildContactMessage(values);
    const mailto = buildMailtoUrl(values.subject.trim(), message);

    if (isWhatsAppConfigured()) {
      const { url, opened } = openWhatsApp(message);
      setResult({ mode: 'whatsapp', url, opened, message, mailto });
    } else if (hasEmail()) {
      setResult({ mode: 'email', url: '', opened: true, message, mailto });
      window.location.href = mailto; // user-triggered, opens the visitor's email app
    } else {
      setResult({ mode: 'unconfigured', url: '', opened: false, message, mailto: '' });
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Contact enquiry form" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="ct-name" label="Full name" required tone="dark" error={showError('name')}>
          <input type="text" autoComplete="name" placeholder="Your full name" {...props('name')} />
        </Field>
        <Field id="ct-email" label="Email" required tone="dark" error={showError('email')}>
          <input type="email" autoComplete="email" placeholder="you@example.com" {...props('email')} />
        </Field>
        <Field id="ct-phone" label="WhatsApp or phone" required tone="dark" error={showError('phone')}>
          <input type="tel" inputMode="tel" autoComplete="tel" placeholder="+44 7700 900123" {...props('phone')} />
        </Field>
        <Field id="ct-subject" label="Subject" required tone="dark" error={showError('subject')}>
          <input type="text" placeholder="How can we help?" {...props('subject')} />
        </Field>
        <Field id="ct-message" label="Message" required tone="dark" error={showError('message')} className="sm:col-span-2">
          <textarea rows={5} placeholder="Tell us about your travel ideas…" {...props('message')} />
        </Field>
      </div>

      <button
        type="submit"
        className="group inline-flex min-h-[3.4rem] w-full items-center justify-center gap-3 rounded-full bg-gold-sheen px-8 py-4 text-base font-bold text-midnight shadow-gold transition duration-300 hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.98] sm:w-auto"
      >
        <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        Send Enquiry
      </button>
      <p className="text-xs leading-relaxed text-ivory/55">
        Nothing is sent until you press send in WhatsApp or your email app.
      </p>

      <SubmissionNotice
        ref={noticeRef}
        tone="dark"
        result={result}
        whatsappNotice="Your message is ready in WhatsApp. Please send it to contact Ceylon Joyrides."
      />
    </form>
  );
}
