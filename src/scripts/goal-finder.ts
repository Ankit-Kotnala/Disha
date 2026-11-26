const roots = document.querySelectorAll<HTMLElement>("[data-goal-finder]");

roots.forEach((root) => {
  const form = root.querySelector<HTMLFormElement>("[data-goal-form]");
  const result = root.querySelector<HTMLElement>("[data-goal-result]");
  const skip = root.querySelector<HTMLButtonElement>("[data-goal-skip]");
  const reopen = root.parentElement?.querySelector<HTMLElement>("[data-goal-reopen]");
  if (!form || !result || !skip || !reopen) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = new FormData(form);
    const goal = String(values.get("goal") ?? "");
    const level = String(values.get("level") ?? "");
    const time = String(values.get("time") ?? "");
    const option = root.querySelector<HTMLElement>(`[data-goal-option="${goal}"]`);
    if (!option) return;
    const title = result.querySelector<HTMLElement>("[data-goal-title]");
    const description = result.querySelector<HTMLElement>("[data-goal-description]");
    const context = result.querySelector<HTMLElement>("[data-goal-context]");
    const link = result.querySelector<HTMLAnchorElement>("[data-goal-link]");
    if (title) title.textContent = option.dataset.title ?? "";
    if (description) description.textContent = option.dataset.description ?? "";
    if (context) context.textContent = `A good first step · ${level} · ${time}`;
    if (link) link.href = `/paths/${option.dataset.slug}/`;
    result.hidden = false;
  });

  form.querySelector("select[name=goal]")?.addEventListener("change", () => { result.hidden = true; });
  skip.addEventListener("click", () => {
    root.hidden = true;
    reopen.hidden = false;
  });
  reopen.querySelector("[data-goal-show]")?.addEventListener("click", () => {
    root.hidden = false;
    reopen.hidden = true;
  });
});
