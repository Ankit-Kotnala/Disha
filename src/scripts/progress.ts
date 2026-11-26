export type LearnerProgress = {
  startedPaths: string[];
  completedLessons: string[];
  savedLessons: string[];
  completedChallenges: string[];
  completedProjects: string[];
  projectChecks: Record<string, string[]>;
  reflections: Record<string, string[]>;
};

export const storageKey = "dishastack-progress-v1";
const emptyProgress: LearnerProgress = {
  startedPaths: [],
  completedLessons: [],
  savedLessons: [],
  completedChallenges: [],
  completedProjects: [],
  projectChecks: {},
  reflections: {},
};

function freshProgress(): LearnerProgress {
  return { ...emptyProgress, projectChecks: {}, reflections: {} };
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function stringArrayMap(value: unknown, preserveIndexes = false): Record<string, string[]> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [
    key,
    preserveIndexes && Array.isArray(item) ? item.map((entry) => typeof entry === "string" ? entry : "") : stringArray(item),
  ]));
}

export function readProgress(): LearnerProgress {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return freshProgress();
    const parsed: unknown = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return freshProgress();
    const value = parsed as Record<string, unknown>;
    return {
      startedPaths: stringArray(value.startedPaths),
      completedLessons: stringArray(value.completedLessons),
      savedLessons: stringArray(value.savedLessons),
      completedChallenges: stringArray(value.completedChallenges),
      completedProjects: stringArray(value.completedProjects),
      projectChecks: stringArrayMap(value.projectChecks),
      reflections: stringArrayMap(value.reflections, true),
    };
  } catch {
    return freshProgress();
  }
}

export function writeProgress(progress: LearnerProgress): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
    window.dispatchEvent(new CustomEvent("dishastack:progress-change"));
  } catch {
    // Storage can be unavailable in restricted browser contexts.
  }
}

export function addProgressItem(field: "startedPaths" | "completedLessons" | "completedChallenges" | "completedProjects", slug: string): void {
  const progress = readProgress();
  if (progress[field].includes(slug)) return;
  progress[field].push(slug);
  writeProgress(progress);
}

export function toggleSavedLesson(slug: string): void {
  const progress = readProgress();
  progress.savedLessons = progress.savedLessons.includes(slug)
    ? progress.savedLessons.filter((item) => item !== slug)
    : [...progress.savedLessons, slug];
  writeProgress(progress);
}

export function toggleProjectRequirement(projectSlug: string, requirement: string): void {
  const progress = readProgress();
  const checked = progress.projectChecks[projectSlug] ?? [];
  progress.projectChecks[projectSlug] = checked.includes(requirement)
    ? checked.filter((item) => item !== requirement)
    : [...checked, requirement];
  writeProgress(progress);
}

export function saveReflection(projectSlug: string, index: number, value: string): void {
  const progress = readProgress();
  const notes = progress.reflections[projectSlug] ?? [];
  while (notes.length <= index) notes.push("");
  notes[index] = value;
  progress.reflections[projectSlug] = notes;
  writeProgress(progress);
}

export function clearProgress(): void {
  writeProgress(freshProgress());
}
