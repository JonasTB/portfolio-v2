import type { ComponentType } from 'react';
import { ExternalLink, GitFork, Mail, MessageCircle } from 'lucide-react';
import type { Profile } from '@portfolio/contracts';
import { useLocalizedText } from '../../hooks/useLocalizedText';
import { Card } from '../ui';

function buildWhatsappUrl(number: string, message: string): string {
  const digits = number.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

interface Channel {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  href: string;
}

function ChannelCard({ icon: Icon, label, href }: Channel) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      <Card
        hoverable
        className="flex items-center gap-3 p-4 transition-colors duration-150 ease-signature"
      >
        <Icon size={18} className="shrink-0 text-accent" />
        <span className="truncate text-sm text-text-secondary">{label}</span>
      </Card>
    </a>
  );
}

export function ContactChannels({ social }: { social: Profile['social'] }) {
  const whatsappMessage = useLocalizedText(
    social.whatsapp?.defaultMessage ?? { 'pt-BR': '', 'en-US': '' },
  );

  const channels: Channel[] = [];
  if (social.email) {
    channels.push({ icon: Mail, label: social.email, href: `mailto:${social.email}` });
  }
  if (social.whatsapp) {
    channels.push({
      icon: MessageCircle,
      label: 'WhatsApp',
      href: buildWhatsappUrl(social.whatsapp.number, whatsappMessage),
    });
  }
  if (social.linkedin) {
    channels.push({ icon: ExternalLink, label: 'LinkedIn', href: social.linkedin });
  }
  channels.push({ icon: GitFork, label: 'GitHub', href: social.github });

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {channels.map((channel) => (
        <ChannelCard key={channel.label} {...channel} />
      ))}
    </div>
  );
}
