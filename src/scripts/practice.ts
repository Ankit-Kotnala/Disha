import { addProgressItem, readProgress } from "./progress";

document.querySelectorAll<HTMLElement>("[data-challenge]").forEach((challenge) => {
  const slug = challenge.dataset.challengeSlug ?? "greeting-template";
  const form = challenge.querySelector<HTMLFormElement>("[data-challenge-form]");
  const input = challenge.querySelector<HTMLInputElement>("[data-challenge-answer]");
  const feedback = challenge.querySelector<HTMLElement>("[data-challenge-feedback]");
  const completed = challenge.querySelector<HTMLElement>("[data-challenge-completed]");
  const hintButton = challenge.querySelector<HTMLButtonElement>("[data-challenge-hint-button]");
  const hint = challenge.querySelector<HTMLElement>("[data-challenge-hint]");
  const solutionButton = challenge.querySelector<HTMLButtonElement>("[data-challenge-solution-button]");
  const solution = challenge.querySelector<HTMLElement>("[data-challenge-solution]");

  const renderDone = () => {
    const done = readProgress().completedChallenges.includes(slug);
    if (completed) completed.hidden = !done;
  };
  renderDone();

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const answer = (input?.value ?? "").trim().replaceAll("`", "").replaceAll("${", "").replaceAll("}", "").toLowerCase();
    const correct = answer === "name";
    if (feedback) {
      feedback.textContent = correct
        ? "That’s it. The variable name inside the braces is name. The template literal inserts its value into the string."
        : "Not quite. Check whether you need the variable’s name or the word it stores. Try again, or reveal the explanation below.";
      feedback.hidden = false;
      feedback.classList.toggle("is-correct", correct);
    }
    if (correct) {
      addProgressItem("completedChallenges", slug);
      renderDone();
    }
  });

  hintButton?.addEventListener("click", () => {
    if (!hint) return;
    hint.hidden = false;
    hintButton.textContent = "Hint shown";
    hintButton.disabled = true;
  });
  solutionButton?.addEventListener("click", () => {
    if (!solution) return;
    solution.hidden = !solution.hidden;
    solutionButton.textContent = solution.hidden ? "Reveal explanation" : "Hide explanation";
  });
  window.addEventListener("dishastack:progress-change", renderDone);
});
