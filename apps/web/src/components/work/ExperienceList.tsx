import type { Experience } from '@portfolio/contracts';
import { Heading } from '../ui';
import { ExperienceEntry } from './ExperienceEntry';

interface CompanyGroup {
  company: string;
  entries: Experience[];
}

function groupByCompany(experiences: Experience[]): CompanyGroup[] {
  const groups: CompanyGroup[] = [];
  for (const experience of experiences) {
    const currentGroup = groups.at(-1);
    if (currentGroup && currentGroup.company === experience.company) {
      currentGroup.entries.push(experience);
    } else {
      groups.push({ company: experience.company, entries: [experience] });
    }
  }
  return groups;
}

export function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const groups = groupByCompany(experiences);

  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => (
        <div key={`${group.company}-${group.entries[0]?.id}`}>
          <Heading as="h2" size="h3" className="mb-2">
            {group.company}
          </Heading>
          <div className="flex flex-col">
            {group.entries.map((experience) => (
              <ExperienceEntry key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
