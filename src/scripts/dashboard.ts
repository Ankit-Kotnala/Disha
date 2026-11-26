import { clearProgress, readProgress } from "./progress";

type DashboardModel = {
  paths: { slug: string; title: string; lessonSlugs: string[]; projectSlug: string }[];
  lessons: { slug: string; title: string; duration: string }[];
  projects: { slug: string; title: string }[];
};

const modelElement = document.querySelector<HTMLScriptElement>("[data-dashboard-model]");
const root = document.querySelector<HTMLElement>("[data-dashboard]");
if (modelElement && root) {
  const model = JSON.parse(modelElement.textContent ?? "{}") as DashboardModel;
  const byLesson = new Map(model.lessons.map((lesson) => [lesson.slug, lesson]));
  const byProject = new Map(model.projects.map((project) => [project.slug, project]));

  const appendLink = (container: HTMLElement, href: string, label: string, meta = "") => {
    const row = document.createElement("div");
    row.className = "saved-item";
    const link = document.createElement("a");
    link.href = href;
    link.textContent = label;
    row.append(link);
    if (meta) {
      const text = document.createElement("span");
      text.textContent = meta;
      row.append(text);
    }
    container.append(row);
  };

  const showEmpty = (container: HTMLElement, title: string, description: string, href: string, linkLabel: string) => {
    const wrapper = document.createElement("div");
    wrapper.className = "dashboard-empty";
    const strong = document.createElement("strong");
    strong.textContent = title;
    const p = document.createElement("p");
    p.textContent = description;
    const a = document.createElement("a");
    a.className = "text-link";
    a.href = href;
    a.textContent = linkLabel;
    wrapper.append(strong, p, a);
    container.replaceChildren(wrapper);
  };

  const render = () => {
    const progress = readProgress();
    const currentPath = [...progress.startedPaths].reverse().map((slug) => model.paths.find((path) => path.slug === slug)).find(Boolean)
      ?? model.paths.find((path) => path.lessonSlugs.some((slug) => progress.completedLessons.includes(slug)));
    const currentTitle = root.querySelector<HTMLElement>("[data-current-title]");
    const currentDescription = root.querySelector<HTMLElement>("[data-current-description]");
    const currentLink = root.querySelector<HTMLAnchorElement>("[data-current-link]");
    const currentLabel = root.querySelector<HTMLElement>("[data-current-label]");
    const currentBar = root.querySelector<HTMLElement>("[data-current-progress]");
    const currentFill = root.querySelector<HTMLElement>("[data-current-fill]");
    const currentTrack = root.querySelector<HTMLElement>("[data-current-track]");
    const currentPercent = root.querySelector<HTMLElement>("[data-current-percent]");
    const currentCount = root.querySelector<HTMLElement>("[data-current-count]");

    const completedCount = currentPath?.lessonSlugs.filter((slug) => progress.completedLessons.includes(slug)).length ?? 0;
    const nextLesson = currentPath?.lessonSlugs.find((slug) => !progress.completedLessons.includes(slug));
    const percent = currentPath ? Math.round((completedCount / Math.max(1, currentPath.lessonSlugs.length)) * 100) : 0;
    if (currentPath) {
      if (currentTitle) currentTitle.textContent = currentPath.title;
      if (currentLabel) currentLabel.textContent = "Your current path";
      if (currentDescription) currentDescription.textContent = nextLesson ? byLesson.get(nextLesson)?.title ?? "Continue your path." : "All lessons completed — start the project.";
      if (currentLink) {
        currentLink.href = nextLesson ? `/learn/${nextLesson}/` : `/projects/${currentPath.projectSlug}/`;
        currentLink.textContent = nextLesson ? "Continue learning" : "Open project";
      }
      if (currentBar) currentBar.hidden = false;
      if (currentFill) currentFill.style.width = `${percent}%`;
      if (currentTrack) currentTrack.setAttribute("aria-valuenow", String(percent));
      if (currentPercent) currentPercent.textContent = `${percent}%`;
      if (currentCount) currentCount.textContent = `${completedCount} of ${currentPath.lessonSlugs.length} lessons`;
    } else {
      if (currentTitle) currentTitle.textContent = "Choose your first path.";
      if (currentLabel) currentLabel.textContent = "Ready when you are";
      if (currentDescription) currentDescription.textContent = "Start with a small goal and build your knowledge one lesson at a time.";
      if (currentLink) { currentLink.href = "/paths/"; currentLink.textContent = "Explore paths"; }
      if (currentBar) currentBar.hidden = true;
    }

    const countLessons = root.querySelector<HTMLElement>("[data-count-lessons]");
    const countChallenges = root.querySelector<HTMLElement>("[data-count-challenges]");
    const countProjects = root.querySelector<HTMLElement>("[data-count-projects]");
    if (countLessons) countLessons.textContent = String(progress.completedLessons.length);
    if (countChallenges) countChallenges.textContent = String(progress.completedChallenges.length);
    if (countProjects) countProjects.textContent = String(progress.completedProjects.length);

    const savedContainer = root.querySelector<HTMLElement>("[data-saved-list]");
    if (savedContainer) {
      const saved = progress.savedLessons.map((slug) => byLesson.get(slug)).filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));
      if (saved.length) {
        savedContainer.replaceChildren();
        saved.forEach((lesson) => appendLink(savedContainer, `/learn/${lesson.slug}/`, lesson.title, lesson.duration));
      } else showEmpty(savedContainer, "Nothing saved yet.", "Bookmark a lesson and it will appear here.", "/paths/", "Find a lesson");
    }

    const completedContainer = root.querySelector<HTMLElement>("[data-completed-list]");
    if (completedContainer) {
      const completed = [...progress.completedLessons].reverse().map((slug) => byLesson.get(slug)).filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson));
      if (completed.length) {
        completedContainer.replaceChildren();
        completed.slice(0, 4).forEach((lesson) => appendLink(completedContainer, `/learn/${lesson.slug}/`, lesson.title, "Complete"));
      } else showEmpty(completedContainer, "Your first checkpoint is waiting.", "Complete a lesson to see it here.", "/paths/", "Choose a path");
    }

    const projectsContainer = root.querySelector<HTMLElement>("[data-project-list]");
    if (projectsContainer) {
      const completed = progress.completedProjects.map((slug) => byProject.get(slug)).filter((project): project is NonNullable<typeof project> => Boolean(project));
      if (completed.length) {
        projectsContainer.replaceChildren();
        completed.forEach((project) => appendLink(projectsContainer, `/projects/${project.slug}/`, project.title, "Complete"));
      } else showEmpty(projectsContainer, "Build when you’re ready.", "Projects turn several small skills into something you can show.", "/projects/", "Browse project briefs");
    }
  };

  root.querySelector<HTMLButtonElement>("[data-reset-progress]")?.addEventListener("click", () => {
    if (window.confirm("Clear all DishaStack progress saved in this browser?")) clearProgress();
  });
  window.addEventListener("dishastack:progress-change", render);
  window.addEventListener("storage", render);
  render();
}
