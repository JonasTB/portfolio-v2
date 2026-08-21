import { Briefcase, Flag, GraduationCap, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { JourneyMilestone } from '@portfolio/contracts';
import { useLocalizedText } from '../../hooks/useLocalizedText';
import { Heading } from '../ui';

const kindIcons: Record<JourneyMilestone['kind'], LucideIcon> = {
  education: GraduationCap,
  role: Briefcase,
  project: Rocket,
  milestone: Flag,
};

function TimelineItem({ milestone, isLast }: { milestone: JourneyMilestone; isLast: boolean }) {
  const title = useLocalizedText(milestone.title);
  const description = useLocalizedText(milestone.description);
  const Icon = kindIcons[milestone.kind];

  return (
    <li className="relative pb-10 pl-12 last:pb-0">
      <span className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface">
        <Icon size={15} className="text-accent" />
      </span>
      {!isLast && <span className="absolute top-8 bottom-0 left-4 w-px bg-border" />}
      <p className="mb-1 font-mono text-xs text-text-tertiary">{milestone.date}</p>
      <Heading as="h3" size="h4" className="mb-1.5">
        {title}
      </Heading>
      <p className="max-w-lg text-sm text-text-secondary">{description}</p>
    </li>
  );
}

export function Timeline({ milestones }: { milestones: JourneyMilestone[] }) {
  return (
    <ol>
      {milestones.map((milestone, index) => (
        <TimelineItem
          key={milestone.id}
          milestone={milestone}
          isLast={index === milestones.length - 1}
        />
      ))}
    </ol>
  );
}
