import Reveal from './Reveal.jsx';

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  tone = 'light', // 'light' = on ivory background, 'dark' = on dark background
  as: Tag = 'h2',
  className = '',
}) {
  const center = align === 'center';
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${tone === 'dark' ? 'eyebrow-light' : ''}`}>{eyebrow}</p>}
      <Tag className={`display-lg mt-4 ${tone === 'dark' ? 'text-ivory' : 'text-midnight'}`}>{title}</Tag>
      {text && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            tone === 'dark' ? 'text-ivory/75' : 'text-midnight/70'
          } ${center ? 'mx-auto' : ''} max-w-2xl`}
        >
          {text}
        </p>
      )}
    </Reveal>
  );
}
