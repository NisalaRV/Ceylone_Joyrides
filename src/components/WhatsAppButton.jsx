import { MessageCircle } from 'lucide-react';
import Button from './Button.jsx';
import { whatsappLinkProps } from '../lib/contact.js';
import siteConfig from '../config/siteConfig.js';

/**
 * "Chat on WhatsApp" button. If no valid WhatsApp number is configured it
 * links to the Contact page instead, so the button always does something useful.
 */
export default function WhatsAppButton({
  children = 'Chat on WhatsApp',
  message = siteConfig.whatsappGreeting,
  variant = 'whatsapp',
  size = 'md',
  className = '',
}) {
  const linkProps = whatsappLinkProps(message);
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      icon={<MessageCircle size={18} aria-hidden="true" />}
      {...linkProps}
    >
      {children}
    </Button>
  );
}
