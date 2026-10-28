/** Accessible form field wrapper: label, optional hint, and error message. */
export function inputClass(tone, hasError) {
  const base = tone === 'dark' ? 'field-input-dark' : 'field-input';
  const border = hasError ? 'border-red-400' : tone === 'dark' ? 'border-white/15' : 'border-midnight/15';
  return `${base} ${border}`;
}

export default function Field({
  id,
  label,
  required = false,
  optionalText = false,
  hint,
  error,
  tone = 'light',
  className = '',
  children,
}) {
  const labelColor = tone === 'dark' ? 'text-ivory/90' : 'text-midnight';
  return (
    <div className={className}>
      <label htmlFor={id} className={`mb-2 block text-sm font-semibold ${labelColor}`}>
        {label}
        {required && (
          <span className="text-gold-600" aria-hidden="true">
            {' '}
            *
          </span>
        )}
        {optionalText && <span className="ml-1 text-xs font-normal opacity-60">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className={`mt-1.5 text-xs ${tone === 'dark' ? 'text-ivory/55' : 'text-midnight/55'}`}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className={`mt-1.5 text-xs font-medium ${tone === 'dark' ? 'text-red-300' : 'text-red-700'}`}>
          {error}
        </p>
      )}
    </div>
  );
}

/** aria attributes shared by every input. */
export function ariaFor(id, error, hint) {
  return {
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
  };
}
