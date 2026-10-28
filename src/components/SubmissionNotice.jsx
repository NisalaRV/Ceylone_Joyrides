import { forwardRef, useState } from 'react';
import { CheckCircle2, AlertTriangle, Copy, Check, Mail, MessageCircle } from 'lucide-react';
import Button from './Button.jsx';

/**
 * Shown after a form is submitted. It NEVER claims the business received the
 * enquiry — the visitor must still press "send" inside WhatsApp / their email app.
 *
 * result = { mode: 'whatsapp' | 'email' | 'unconfigured', url, opened, message, mailto }
 */
const SubmissionNotice = forwardRef(function SubmissionNotice(
  { result, whatsappNotice, tone = 'light' },
  ref,
) {
  const [copied, setCopied] = useState(false);
  if (!result) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(result.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const dark = tone === 'dark';
  const shell = dark
    ? 'border-gold/40 bg-gold/10 text-ivory'
    : 'border-forest/25 bg-forest/5 text-midnight';
  const warnShell = dark
    ? 'border-amber-300/40 bg-amber-300/10 text-ivory'
    : 'border-amber-500/40 bg-amber-50 text-midnight';

  const isWhatsApp = result.mode === 'whatsapp';
  const isEmail = result.mode === 'email';

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className={`rounded-2xl border p-5 sm:p-6 outline-none ${isWhatsApp || isEmail ? shell : warnShell}`}
    >
      <div className="flex gap-3">
        {isWhatsApp || isEmail ? (
          <CheckCircle2 className="mt-0.5 shrink-0 text-gold-600" size={22} aria-hidden="true" />
        ) : (
          <AlertTriangle className="mt-0.5 shrink-0 text-amber-500" size={22} aria-hidden="true" />
        )}
        <div className="min-w-0 space-y-4 text-sm leading-relaxed">
          {isWhatsApp && <p className="font-semibold">{whatsappNotice}</p>}
          {isEmail && (
            <p className="font-semibold">
              Your enquiry is ready in your email app. Please press send to contact us. Your enquiry is not received
              until you send it.
            </p>
          )}
          {result.mode === 'unconfigured' && (
            <p className="font-semibold">
              Sending from this website is not set up yet. The business still needs to add its WhatsApp number or
              email address in the site settings. Your details have not been sent anywhere. You can copy your enquiry
              below and send it to Ceylon Joyrides yourself.
            </p>
          )}

          {isWhatsApp && !result.opened && (
            <p className="opacity-80">
              If WhatsApp did not open (your browser may have blocked the pop-up), use the button below.
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {isWhatsApp && (
              <Button
                href={result.url}
                external
                variant="whatsapp"
                size="sm"
                icon={<MessageCircle size={16} aria-hidden="true" />}
              >
                Open WhatsApp
              </Button>
            )}
            {isEmail && (
              <Button href={result.mailto} variant="whatsapp" size="sm" icon={<Mail size={16} aria-hidden="true" />}>
                Open email app
              </Button>
            )}
            {result.mode === 'unconfigured' && result.mailto && (
              <Button href={result.mailto} variant="whatsapp" size="sm" icon={<Mail size={16} aria-hidden="true" />}>
                Email instead
              </Button>
            )}
            <button
              type="button"
              onClick={copy}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                dark ? 'border-ivory/30 hover:border-gold hover:text-gold' : 'border-midnight/25 hover:border-forest hover:text-forest'
              }`}
            >
              {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy my enquiry'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SubmissionNotice;
