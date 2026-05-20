import { Award } from "lucide-react";
import type { MusicProgram } from "./types";

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-inherit pt-4 first:border-t-0 first:pt-0">
      <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold">
        {title}
      </h5>
      {children}
    </div>
  );
}

function isCurriculumHeader(item: string) {
  return /^Module \d|^Assessments/i.test(item);
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) =>
        isCurriculumHeader(item) ? (
          <li
            key={item}
            className="pt-3 text-xs font-bold uppercase tracking-wider text-gold first:pt-0"
          >
            {item}
          </li>
        ) : (
          <li key={item} className="flex gap-2">
            <span className="shrink-0 text-gold">✓</span>
            <span>{item}</span>
          </li>
        )
      )}
    </ul>
  );
}

function TagPills({
  items,
  prefix,
  className,
}: {
  items: string[];
  prefix: string;
  className: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full border px-2.5 py-1 text-xs ${className}`}
        >
          {prefix} {item}
        </span>
      ))}
    </div>
  );
}

/** All program details in one panel (single dropdown per course). */
export function buildProgramDetailsContent(
  program: MusicProgram,
  ragaLabel: string
) {
  const ragas = program.ragas ?? program.raags;

  return (
    <div className="space-y-4">
      {program.objectives.length > 0 && (
        <SectionBlock title="Course Objectives">
          <CheckList items={program.objectives} />
        </SectionBlock>
      )}

      <SectionBlock title="Curriculum">
        <CheckList items={program.curriculum} />
      </SectionBlock>

      {ragas && ragas.length > 0 && (
        <SectionBlock title={`${ragaLabel} Covered`}>
          <TagPills
            items={ragas}
            prefix="🎼"
            className="border-gold/25 bg-gold/10"
          />
        </SectionBlock>
      )}

      {program.compositions && program.compositions.length > 0 && (
        <SectionBlock title="Compositions">
          <CheckList items={program.compositions} />
        </SectionBlock>
      )}

      {program.songs && program.songs.length > 0 && (
        <SectionBlock title="Songs Covered">
          <TagPills
            items={program.songs}
            prefix="🎵"
            className="border-magenta/25 bg-magenta/10"
          />
        </SectionBlock>
      )}

      {program.courseContent && program.courseContent.length > 0 && (
        <SectionBlock title="Course Content">
          <TagPills
            items={program.courseContent}
            prefix="🎵"
            className="border-purple/20 bg-purple/10"
          />
        </SectionBlock>
      )}

      {program.skills && program.skills.length > 0 && (
        <SectionBlock title="Skills Developed">
          <CheckList items={program.skills} />
        </SectionBlock>
      )}

      {program.performance && program.performance.length > 0 && (
        <SectionBlock title="Performance & Opportunities">
          <CheckList items={program.performance} />
        </SectionBlock>
      )}

      <SectionBlock title="Certification">
        <p className="flex items-start gap-2 text-sm font-medium">
          <Award size={16} className="mt-0.5 shrink-0 text-gold" />
          <span>🎓 {program.certification}</span>
        </p>
      </SectionBlock>
    </div>
  );
}
