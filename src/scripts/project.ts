import { addProgressItem, readProgress, saveReflection, toggleProjectRequirement } from "./progress";

document.querySelectorAll<HTMLElement>("[data-project]").forEach((project) => {
  const slug = project.dataset.projectSlug ?? "";
  const requirements = [...project.querySelectorAll<HTMLButtonElement>("[data-project-requirement]")];
  const complete = project.querySelector<HTMLButtonElement>("[data-complete-project]");
  const hint = project.querySelector<HTMLElement>("[data-project-hint]");

  const render = () => {
    const progress = readProgress();
    const checked = progress.projectChecks[slug] ?? [];
    const done = progress.completedProjects.includes(slug);
    requirements.forEach((button) => {
      const requirement = button.dataset.projectRequirement ?? "";
      const isChecked = checked.includes(requirement);
      button.setAttribute("aria-pressed", String(isChecked));
      button.setAttribute("aria-label", `Mark ${requirement} ${isChecked ? "incomplete" : "complete"}`);
      button.innerHTML = isChecked ? "<span aria-hidden=\"true\">✓</span>" : "<span aria-hidden=\"true\"></span>";
      button.closest("li")?.classList.toggle("is-complete", isChecked);
    });
    const canComplete = requirements.length > 0 && checked.length >= requirements.length;
    if (complete) {
      complete.disabled = !canComplete && !done;
      complete.textContent = done ? "Project marked complete" : "Mark project complete";
    }
    if (hint) hint.hidden = canComplete || done;
    project.querySelectorAll<HTMLTextAreaElement>("[data-reflection-index]").forEach((field) => {
      const index = Number(field.dataset.reflectionIndex);
      if (document.activeElement !== field) field.value = progress.reflections[slug]?.[index] ?? "";
    });
  };

  requirements.forEach((button) => button.addEventListener("click", () => {
    toggleProjectRequirement(slug, button.dataset.projectRequirement ?? "");
    render();
  }));
  project.querySelectorAll<HTMLTextAreaElement>("[data-reflection-index]").forEach((field) => field.addEventListener("input", () => {
    saveReflection(slug, Number(field.dataset.reflectionIndex), field.value);
  }));
  complete?.addEventListener("click", () => {
    addProgressItem("completedProjects", slug);
    render();
  });
  window.addEventListener("dishastack:progress-change", render);
  render();
});
