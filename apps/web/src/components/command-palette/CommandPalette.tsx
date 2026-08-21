import { useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { useNavigate } from 'react-router';
import * as Dialog from '@radix-ui/react-dialog';
import { Command, ExternalLink, FileText, Moon, Search, SunMoon } from 'lucide-react';
import { navItems } from '../../config/navigation';
import { useLocale } from '../../app/providers/useLocale';
import { useTheme } from '../../app/providers/useTheme';
import { useProfile } from '../../hooks/useProfile';
import { IconButton } from '../ui';
import { cn } from '../../lib/cn';

interface PaletteCommand {
  id: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  perform: () => void;
  keywords?: string[];
  /** Nunca aparece com a busca vazia — só quando o termo digitado casa. */
  secret?: boolean;
}

function matches(command: PaletteCommand, query: string): boolean {
  if (!query) return !command.secret;
  const haystack = [command.label, ...(command.keywords ?? [])].join(' ').toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { t } = useLocale();
  const { theme, setTheme } = useTheme();
  const { data: profile } = useProfile();

  function openPalette() {
    setQuery('');
    setActiveIndex(0);
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function handleOpenChange(next: boolean) {
    if (next) {
      openPalette();
    } else {
      setOpen(false);
    }
  }

  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      const isModifierK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      if (!isModifierK) return;
      event.preventDefault();
      if (open) {
        setOpen(false);
      } else {
        openPalette();
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [open]);

  const commands = useMemo<PaletteCommand[]>(() => {
    const list: PaletteCommand[] = navItems.map((item) => ({
      id: `nav-${item.to}`,
      label: `Go to ${item.label}`,
      icon: Search,
      perform: () => navigate(item.to),
    }));

    const themeOrder: Array<'system' | 'light' | 'dark'> = ['system', 'light', 'dark'];
    list.push({
      id: 'theme-cycle',
      label: 'Change theme',
      icon: SunMoon,
      perform: () => setTheme(themeOrder[(themeOrder.indexOf(theme) + 1) % themeOrder.length]!),
    });

    if (profile.social.github) {
      list.push({
        id: 'open-github',
        label: 'Open GitHub',
        icon: ExternalLink,
        perform: () => window.open(profile.social.github, '_blank', 'noreferrer'),
      });
    }
    if (profile.social.linkedin) {
      list.push({
        id: 'open-linkedin',
        label: 'Open LinkedIn',
        icon: ExternalLink,
        perform: () => window.open(profile.social.linkedin, '_blank', 'noreferrer'),
      });
    }
    if (profile.resumeUrl) {
      list.push({
        id: 'download-cv',
        label: 'Download CV',
        icon: FileText,
        perform: () => window.open(profile.resumeUrl, '_blank', 'noreferrer'),
      });
    }

    list.push({
      id: 'join-dark-side',
      label: 'Join the dark side',
      icon: Moon,
      keywords: ['dark side', 'sith', 'vader', 'dark'],
      secret: true,
      perform: () => setTheme('dark'),
    });

    return list;
  }, [navigate, profile, setTheme, theme]);

  const visible = useMemo(
    () => commands.filter((command) => matches(command, query)),
    [commands, query],
  );

  function handleQueryChange(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function run(command: PaletteCommand) {
    command.perform();
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, visible.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const command = visible[activeIndex];
      if (command) run(command);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <IconButton aria-label={t('commandPalette.open')} title="⌘K" icon={<Command size={18} />} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed top-24 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-surface shadow-elevated-md"
          onKeyDown={handleKeyDown}
        >
          <Dialog.Title className="sr-only">{t('commandPalette.title')}</Dialog.Title>
          <div className="flex items-center gap-2 border-b border-border px-4">
            <Search size={16} className="text-text-tertiary" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder={t('commandPalette.placeholder')}
              className="h-12 w-full bg-transparent text-sm text-text placeholder:text-text-tertiary focus:outline-none"
            />
          </div>
          <ul className="max-h-80 overflow-y-auto p-2">
            {visible.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-text-tertiary">
                {t('commandPalette.empty')}
              </li>
            )}
            {visible.map((command, index) => (
              <li key={command.id}>
                <button
                  type="button"
                  onClick={() => run(command)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-text-secondary transition-colors duration-150 ease-signature',
                    index === activeIndex && 'bg-surface-hover text-text',
                  )}
                >
                  <command.icon size={16} className="shrink-0 text-text-tertiary" />
                  {command.label}
                </button>
              </li>
            ))}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
