import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from '../../app/providers/useTheme';
import type { Theme } from '../../app/providers/theme-context';
import { useLocale } from '../../app/providers/useLocale';
import { IconButton } from '../ui';
import { Tooltip } from '../ui';

const order: Theme[] = ['system', 'light', 'dark'];

const icons: Record<Theme, typeof Sun> = {
  system: SunMoon,
  light: Sun,
  dark: Moon,
};

const labels: Record<Theme, { 'pt-BR': string; 'en-US': string }> = {
  system: { 'pt-BR': 'Tema: sistema', 'en-US': 'Theme: system' },
  light: { 'pt-BR': 'Tema: claro', 'en-US': 'Theme: light' },
  dark: { 'pt-BR': 'Tema: escuro', 'en-US': 'Theme: dark' },
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { locale } = useLocale();
  const Icon = icons[theme];
  const label = labels[theme][locale];

  const handleClick = () => {
    const currentIndex = order.indexOf(theme);
    const next = order[(currentIndex + 1) % order.length]!;
    setTheme(next);
  };

  return (
    <Tooltip content={label}>
      <IconButton aria-label={label} icon={<Icon size={18} />} onClick={handleClick} />
    </Tooltip>
  );
}
