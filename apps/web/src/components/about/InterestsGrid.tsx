import { Film, Gamepad2, Music, Sparkles, Tv } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Interests } from '@portfolio/contracts';
import { useLocale } from '../../app/providers/useLocale';
import { Badge } from '../ui';

const groups: { key: keyof Interests; icon: LucideIcon; labelKey: string }[] = [
  { key: 'music', icon: Music, labelKey: 'about.interests.music' },
  { key: 'series', icon: Tv, labelKey: 'about.interests.series' },
  { key: 'films', icon: Film, labelKey: 'about.interests.films' },
  { key: 'games', icon: Gamepad2, labelKey: 'about.interests.games' },
  { key: 'other', icon: Sparkles, labelKey: 'about.interests.other' },
];

export function InterestsGrid({ interests }: { interests: Interests }) {
  const { t } = useLocale();
  const activeGroups = groups.filter((group) => interests[group.key]?.length);

  return (
    <div className="flex flex-col gap-4">
      {activeGroups.map(({ key, icon: Icon, labelKey }) => (
        <div key={key} className="flex items-start gap-3">
          <Icon size={18} className="mt-0.5 shrink-0 text-accent" />
          <div>
            <p className="mb-1.5 text-sm font-medium text-text">{t(labelKey)}</p>
            <div className="flex flex-wrap gap-2">
              {interests[key]?.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
