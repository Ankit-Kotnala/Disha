const filterPages = document.querySelectorAll<HTMLElement>("[data-filter-page]");

filterPages.forEach((page) => {
  const search = page.querySelector<HTMLInputElement>("[data-filter-search]");
  const category = page.querySelector<HTMLSelectElement>("[data-filter-category]");
  const level = page.querySelector<HTMLSelectElement>("[data-filter-level]");
  const status = page.querySelector<HTMLSelectElement>("[data-filter-status]");
  const cards = [...page.querySelectorAll<HTMLElement>("[data-filter-card]")];
  const count = page.querySelector<HTMLElement>("[data-filter-count]");
  const empty = page.querySelector<HTMLElement>("[data-filter-empty]");
  const clear = page.querySelector<HTMLButtonElement>("[data-filter-clear]");

  const apply = () => {
    const query = (search?.value ?? "").trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const textMatch = (card.dataset.search ?? "").includes(query);
      const categoryMatch = !category || category.value === "all" || card.dataset.category === category.value;
      const levelMatch = !level || level.value === "all" || card.dataset.level === level.value;
      const selectedStatus = status?.value ?? "all";
      const itemStatus = card.dataset.status ?? "";
      const statusMatch = selectedStatus === "all"
        || itemStatus === selectedStatus
        || (selectedStatus === "learning" && ["complete", "preview"].includes(itemStatus))
        || (selectedStatus === "resources" && ["curated", "coming-soon"].includes(itemStatus));
      const show = textMatch && categoryMatch && levelMatch && statusMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (count) count.textContent = `${visible} ${visible === 1 ? "result" : "results"}`;
    if (empty) empty.hidden = visible !== 0;
  };

  [search, category, level, status].forEach((control) => {
    control?.addEventListener("input", apply);
    control?.addEventListener("change", apply);
  });
  clear?.addEventListener("click", () => {
    if (search) search.value = "";
    if (category) category.value = "all";
    if (level) level.value = "all";
    if (status) status.value = "all";
    apply();
    search?.focus();
  });
});
