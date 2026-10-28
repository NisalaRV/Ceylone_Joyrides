import { motion, useReducedMotion } from 'framer-motion';

/** Scroll-reveal wrapper. Renders a plain element when the visitor prefers reduced motion. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  as = 'div',
  className = '',
  amount = 0.2,
  ...rest
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
