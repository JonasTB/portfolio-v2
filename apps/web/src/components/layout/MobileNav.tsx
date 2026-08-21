import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router';
import { navItems } from '../../config/navigation';
import { useLocale } from '../../app/providers/useLocale';
import { IconButton } from '../ui';
import { cn } from '../../lib/cn';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <div className="md:hidden">
          <IconButton aria-label={t('nav.openMenu')} icon={<Menu size={20} />} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm md:hidden" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col gap-1 border-l border-border bg-surface p-6 md:hidden">
          <div className="mb-6 flex justify-end">
            <Dialog.Close asChild>
              <IconButton aria-label={t('nav.closeMenu')} icon={<X size={20} />} />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Navegação</Dialog.Title>
          <nav aria-label="Principal" className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-3 text-lg font-medium text-text-secondary transition-colors duration-150 ease-signature hover:text-text',
                    isActive && 'text-text',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
