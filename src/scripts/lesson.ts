import { addProgressItem, readProgress, toggleSavedLesson } from "./progress";

document.querySelectorAll<HTMLElement>("[data-lesson]").forEach((lesson) => {
  const slug = lesson.dataset.lessonSlug ?? "";
  const choices = [...lesson.querySelectorAll<HTMLButtonElement>("[data-answer-choice]")];
  const checkButton = lesson.querySelector<HTMLButtonElement>("[data-check-answer]");
  const answerResult = lesson.querySelector<HTMLElement>("[data-answer-result]");
  const completeButton = lesson.querySelector<HTMLButtonElement>("[data-complete-lesson]");
  let selected: number | null = null;

  const renderComplete = () => {
    if (completeButton && readProgress().completedLessons.includes(slug)) {
      completeButton.textContent = "Lesson completed";
      completeButton.disabled = true;
    }
  };
  renderComplete();

  choices.forEach((choice) => choice.addEventListener("click", () => {
    selected = Number(choice.dataset.answerChoice);
    choices.forEach((item) => {
      const active = item === choice;
      item.classList.toggle("selected", active);
      item.setAttribute("aria-pressed", String(active));
      item.classList.remove("correct", "incorrect");
    });
    if (checkButton) checkButton.disabled = false;
    if (answerResult) answerResult.hidden = true;
  }));

  checkButton?.addEventListener("click", () => {
    if (selected === null || !answerResult) return;
    const answer = Number(lesson.dataset.answerIndex);
    const correct = selected === answer;
    const chosen = choices[selected];
    const right = choices[answer];
    chosen?.classList.add(correct ? "correct" : "incorrect");
    right?.classList.add("correct");
    answerResult.textContent = `${correct ? "That’s right. " : `Not quite. The best answer is ${String.fromCharCode(65 + answer)}. `}${lesson.dataset.answerFeedback ?? ""}`;
    answerResult.hidden = false;
  });

  lesson.querySelectorAll<HTMLButtonElement>("[data-show-hint]").forEach((button) => button.addEventListener("click", () => {
    const result = lesson.querySelector<HTMLElement>("[data-hint-result]");
    if (result) {
      result.textContent = button.dataset.hintText ?? "";
      result.hidden = false;
    }
    button.textContent = `Hint ${Number(button.dataset.showHint) + 1} shown`;
    button.disabled = true;
  }));

  const solutionButton = lesson.querySelector<HTMLButtonElement>("[data-toggle-solution]");
  const solution = lesson.querySelector<HTMLElement>("[data-solution]");
  solutionButton?.addEventListener("click", () => {
    if (!solution) return;
    solution.hidden = !solution.hidden;
    solutionButton.textContent = solution.hidden ? "Reveal an example answer" : "Hide the example answer";
  });

  lesson.querySelector<HTMLButtonElement>("[data-copy-code]")?.addEventListener("click", async (event) => {
    const button = event.currentTarget as HTMLButtonElement;
    const code = lesson.querySelector<HTMLElement>("[data-code-content]")?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Select code to copy";
    }
  });

  lesson.querySelector<HTMLButtonElement>("[data-save-lesson]")?.addEventListener("click", () => toggleSavedLesson(slug));
  completeButton?.addEventListener("click", () => {
    addProgressItem("completedLessons", slug);
    renderComplete();
  });
});
