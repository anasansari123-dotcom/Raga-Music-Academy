import { Award } from "lucide-react";
import type { MusicProgram } from "./types";

export function buildProgramAccordionItems(
  program: MusicProgram,
  ragaLabel: string
) {
  const items: { title: string; content: React.ReactNode }[] = [];

  if (program.objectives.length) {
    items.push({
      title: "Course Objectives",
      content: (
        <ul className="space-y-2 text-sm">
          {program.objectives.map((obj) => (
            <li key={obj} className="flex gap-2">
              <span className="shrink-0 text-gold">✓</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  items.push({
    title: "Curriculum",
    content: (
      <ul className="space-y-2 text-sm">
        {program.curriculum.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="shrink-0 text-gold">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  });

  const ragas = program.ragas ?? program.raags;
  if (ragas?.length) {
    items.push({
      title: `${ragaLabel} Covered`,
      content: (
        <div className="flex flex-wrap gap-2">
          {ragas.map((r) => (
            <span
              key={r}
              className="rounded-full border border-gold/25 bg-gold/10 px-2.5 py-1 text-xs"
            >
              🎼 {r}
            </span>
          ))}
        </div>
      ),
    });
  }

  if (program.compositions?.length) {
    items.push({
      title: "Compositions",
      content: (
        <ul className="space-y-2 text-sm">
          {program.compositions.map((c) => (
            <li key={c} className="flex gap-2">
              <span className="shrink-0 text-gold">✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (program.songs?.length) {
    items.push({
      title: "Songs Covered",
      content: (
        <div className="flex flex-wrap gap-2">
          {program.songs.map((s) => (
            <span
              key={s}
              className="rounded-full border border-magenta/25 bg-magenta/10 px-2.5 py-1 text-xs"
            >
              🎵 {s}
            </span>
          ))}
        </div>
      ),
    });
  }

  if (program.courseContent?.length) {
    items.push({
      title: "Course Content",
      content: (
        <div className="flex flex-wrap gap-2">
          {program.courseContent.map((c) => (
            <span
              key={c}
              className="rounded-full border border-purple/20 bg-purple/10 px-2.5 py-1 text-xs"
            >
              🎵 {c}
            </span>
          ))}
        </div>
      ),
    });
  }

  if (program.skills?.length) {
    items.push({
      title: "Skills Developed",
      content: (
        <ul className="space-y-2 text-sm">
          {program.skills.map((s) => (
            <li key={s} className="flex gap-2">
              <span className="shrink-0 text-gold">✓</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (program.performance?.length) {
    items.push({
      title: "Performance & Opportunities",
      content: (
        <ul className="space-y-2 text-sm">
          {program.performance.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="shrink-0 text-gold">✓</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  items.push({
    title: "Certification",
    content: (
      <p className="flex items-start gap-2 text-sm font-medium">
        <Award size={16} className="mt-0.5 shrink-0 text-gold" />
        <span>🎓 {program.certification}</span>
      </p>
    ),
  });

  return items;
}
