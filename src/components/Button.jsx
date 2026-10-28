import { Link } from 'react-router-dom';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition duration-300 ease-out active:scale-[0.97] focus-visible:outline-gold';

const variants = {
  primary: 'bg-gold-sheen text-midnight shadow-gold hover:-translate-y-0.5 hover:brightness-105',
  dark: 'bg-midnight text-ivory hover:-translate-y-0.5 hover:bg-forest',
  outline:
    'border border-ivory/40 text-ivory backdrop-blur-sm hover:-translate-y-0.5 hover:border-gold hover:text-gold',
  outlineDark:
    'border border-midnight/25 text-midnight hover:-translate-y-0.5 hover:border-forest hover:bg-forest hover:text-ivory',
  whatsapp: 'bg-forest text-ivory ring-1 ring-gold/40 hover:-translate-y-0.5 hover:bg-forest-600',
  link: 'rounded-none px-0 text-gold-600 hover:text-forest',
};

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-[0.95rem]',
  lg: 'px-9 py-4 text-base',
  none: '',
};

/**
 * Polymorphic button:
 *  - `to`   → internal React Router link
 *  - `href` → external/anchor link (opens in a new tab with `external`)
 *  - none   → <button>
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  external = false,
  icon,
  iconRight,
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {iconRight && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">{iconRight}</span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
