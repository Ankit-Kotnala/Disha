import { addProgressItem, readProgress } from "./progress";

function renderProgress(): void {
  const progress = readProgress();

  document.querySelectorAll<HTMLElement>("[data-path-progress]").forEach((target) => {
    const lessons = (target.dataset.lessonSlugs ?? "").split(",").filter(Boolean);
    const completed = lessons.filter((slug) => progress.completedLessons.includes(slug)).length;
    if (!completed) {
      target.hidden = true;
      return;
    }
    const percent = Math.round((completed / Math.max(1, lessons.length)) * 100);
    target.hidden = false;
    target.innerHTML = `<div class="progress-wrap"><div class="progress-meta"><span>${completed} of ${lessons.length} lessons</span><span>${percent}%</span></div><div class="progress-track" role="progressbar" aria-label="${completed} of ${lessons.length} lessons" aria-valuemin="0" aria-valuemax="${lessons.length}" aria-valuenow="${completed}"><span style="width:${percent}%"></span></div></div>`;
  });

  document.querySelectorAll<HTMLElement>("[data-path-actions]").forEach((container) => {
    const lessons = (container.dataset.lessonSlugs ?? "").split(",").filter(Boolean);
    const completed = lessons.filter((slug) => progress.completedLessons.includes(slug)).length;
    const next = lessons.find((slug) => !progress.completedLessons.includes(slug));
    const started = progress.startedPaths.includes(container.dataset.pathSlug ?? "") || completed > 0;
    const action = container.querySelector<HTMLAnchorElement>("[data-start-path]");
    const progressView = container.querySelector<HTMLElement>("[data-path-progress-view]");
    const note = container.querySelector<HTMLElement>("[data-path-complete-note]");
    if (action) {
      const done = lessons.length > 0 && completed === lessons.length;
      action.href = done ? `/projects/${container.dataset.projectSlug}/` : `/learn/${next ?? lessons[0]}/`;
      action.textContent = done ? "Go to project" : started ? "Continue learning" : "Start this path";
      action.dataset.pathComplete = String(done);
    }
    if (progressView) {
      progressView.hidden = completed === 0;
      const percent = Math.round((completed / Math.max(1, lessons.length)) * 100);
      const text = progressView.querySelector(".progress-meta span");
      const value = progressView.querySelector(".progress-meta span:last-child");
      const track = progressView.querySelector<HTMLElement>("[role=progressbar]");
      const fill = progressView.querySelector<HTMLElement>(".progress-track span");
      if (text) text.textContent = `${completed} of ${lessons.length} lessons`;
      if (value) value.textContent = `${percent}%`;
      if (track) {
        track.setAttribute("aria-label", `${completed} of ${lessons.length} lessons`);
        track.setAttribute("aria-valuenow", String(percent));
      }
      if (fill) fill.style.width = `${percent}%`;
    }
    if (note) note.hidden = completed !== lessons.length || completed === 0;
  });

  document.querySelectorAll<HTMLElement>("[data-lesson-status]").forEach((status) => {
    const done = progress.completedLessons.includes(status.dataset.lessonStatus ?? "");
    status.textContent = done ? "✓ Done" : "Ready";
    status.classList.toggle("lesson-done", done);
  });

  document.querySelectorAll<HTMLButtonElement>("[data-save-lesson]").forEach((button) => {
    const saved = progress.savedLessons.includes(button.dataset.saveLesson ?? "");
    button.textContent = saved ? "Saved" : "Save lesson";
    button.classList.toggle("is-saved", saved);
    button.setAttribute("aria-pressed", String(saved));
  });
}

document.querySelectorAll<HTMLAnchorElement>("[data-start-path]").forEach((link) => {
  link.addEventListener("click", () => {
    const container = link.closest<HTMLElement>("[data-path-actions]");
    if (container && link.dataset.pathComplete !== "true") addProgressItem("startedPaths", container.dataset.pathSlug ?? "");
  });
});

window.addEventListener("dishastack:progress-change", renderProgress);
window.addEventListener("storage", renderProgress);
renderProgress();
