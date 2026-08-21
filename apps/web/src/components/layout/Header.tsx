import { Link as RouterLink } from 'react-router';
import { Container } from '../ui';
import { Logo } from './Logo';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CommandPalette } from '../command-palette/CommandPalette';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur">
      <Container size="wide" className="flex h-16 items-center justify-between">
        <RouterLink
          to="/"
          className="flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Logo className="h-8 w-8" />
          <span className="font-heading text-sm font-medium text-text">Jonas Timbáuba</span>
        </RouterLink>

        <div className="flex items-center gap-1">
          <DesktopNav />
          <div className="mx-1 h-5 w-px bg-border" />
          <LanguageSwitcher />
          <CommandPalette />
          <ThemeSwitcher />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
