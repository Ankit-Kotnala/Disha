export type ContentStatus = "complete" | "preview" | "curated" | "coming-soon";
export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Lesson = {
  slug: string;
  pathSlug: string;
  title: string;
  duration: string;
  summary: string;
  objectives: string[];
  prerequisite: string;
  sections: { heading: string; body: string }[];
  code?: { language: string; label: string; source: string };
  check: { question: string; options: string[]; answer: number; feedback: string };
  exercise: { prompt: string; hints: string[]; solution: string };
  sources: { label: string; url: string }[];
  lastReviewed?: string;
};

export type LearningPath = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  level: Level;
  duration: string;
  category: string;
  status: ContentStatus;
  accent: "lime" | "blue" | "violet";
  skills: string[];
  outcomes: string[];
  prerequisite: string;
  projectSlug: string;
  lessonSlugs: string[];
  nextStep: string;
};

export const paths: LearningPath[] = [
  {
    slug: "build-your-first-web-app",
    title: "Build your first web app",
    eyebrow: "The web, from the ground up",
    description: "Learn how the browser works, build a responsive page, add interaction, and share a project you can keep improving.",
    level: "Beginner",
    duration: "6 lessons · about 3 hours",
    category: "Web development",
    status: "complete",
    accent: "lime",
    skills: ["HTML", "CSS", "JavaScript", "Accessibility", "Git"],
    outcomes: ["Explain how a browser requests a page", "Structure and style a responsive web page", "Add a small interaction with JavaScript", "Share your work with a clear README"],
    prerequisite: "None. You can start with a browser and curiosity.",
    projectSlug: "personal-homepage",
    lessonSlugs: ["web-and-the-browser", "semantic-html", "css-layout", "javascript-interaction", "accessible-forms", "git-and-debugging"],
    nextStep: "Build a small page about something you care about.",
  },
  {
    slug: "python-and-data-foundations",
    title: "Python and data foundations",
    eyebrow: "Make data useful",
    description: "Get comfortable with Python, explore a small dataset, and explain the pattern you find. The full project path is coming next.",
    level: "Beginner",
    duration: "Preview · 1 lesson",
    category: "Python & data",
    status: "preview",
    accent: "blue",
    skills: ["Python", "Data", "Problem solving"],
    outcomes: ["Read and change a small Python program", "Describe a dataset with a clear question", "Choose a useful next lesson"],
    prerequisite: "No Python experience needed.",
    projectSlug: "data-story-preview",
    lessonSlugs: ["python-first-steps"],
    nextStep: "Continue with Python basics, then inspect a small CSV dataset.",
  },
  {
    slug: "ai-foundations-and-applications",
    title: "AI foundations & applications",
    eyebrow: "Understand before you build",
    description: "Learn what modern AI systems can and cannot do, then map the pieces of a small AI-powered product. This path is a preview.",
    level: "Beginner",
    duration: "Preview · 1 lesson",
    category: "AI & machine learning",
    status: "preview",
    accent: "violet",
    skills: ["AI literacy", "Prompting", "Evaluation"],
    outcomes: ["Explain the difference between a model and an application", "Spot a reason to verify an AI answer", "Describe a safe, useful AI feature"],
    prerequisite: "No machine-learning background needed.",
    projectSlug: "ai-feature-map-preview",
    lessonSlugs: ["what-ai-can-and-cannot-do"],
    nextStep: "Start with AI basics, then learn how to test outputs for quality.",
  },
];

export const lessons: Lesson[] = [
  {
    slug: "web-and-the-browser", pathSlug: "build-your-first-web-app", title: "A page is a conversation", duration: "18 min",
    summary: "See what happens between entering a URL and reading a page.",
    objectives: ["Name the browser, server, and URL in a web request", "Describe the roles of HTML, CSS, and JavaScript"],
    prerequisite: "None. This lesson starts at the beginning.",
    sections: [
      { heading: "A request and a response", body: "A browser is a program that asks another computer for a resource. The address bar holds a URL; the browser sends a request; a server replies with files. Your browser then interprets those files and draws the page." },
      { heading: "Three layers make a page", body: "HTML describes the content and its structure. CSS describes its appearance and layout. JavaScript can respond to actions and update the page. They work together, but each has a different job." },
      { heading: "A useful mental model", body: "Think of a web page like a small venue: HTML is the rooms and signs, CSS is the layout and decoration, and JavaScript is the person who responds when someone presses a button." },
    ],
    code: { language: "text", label: "A browser request, simplified", source: "Browser  →  Request for a URL\nServer   →  HTML, CSS, images, and other files\nBrowser  →  Turns those files into a page" },
    check: { question: "Which technology describes the structure and meaning of page content?", options: ["CSS", "HTML", "JavaScript"], answer: 1, feedback: "HTML provides structure and meaning. CSS styles it, and JavaScript adds behavior." },
    exercise: { prompt: "Pick a page you use often. Find one heading, one visual style, and one interaction. Which layer is responsible for each?", hints: ["A heading is content structure.", "Think about what changes color, size, or position.", "A menu opening after a click is an interaction."], solution: "The heading is HTML, its appearance is CSS, and a menu that opens after a click is usually controlled by JavaScript." },
    sources: [{ label: "MDN: How the web works", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works" }],
  },
  {
    slug: "semantic-html", pathSlug: "build-your-first-web-app", title: "Give your content structure", duration: "24 min",
    summary: "Use HTML elements that explain what each part of a page means.",
    objectives: ["Use headings in a meaningful order", "Choose elements by purpose rather than appearance"],
    prerequisite: "Complete “A page is a conversation” or know what HTML is for.",
    sections: [
      { heading: "Meaning before appearance", body: "A heading is not just large text. It tells people and software what a section is about. A button means an action can happen. A link takes you somewhere. Choosing the right element makes a page easier to navigate and maintain." },
      { heading: "Build a clear outline", body: "Start with one main heading for the page. Use subheadings for sections beneath it. Heading levels describe the outline; CSS can make them look however your design needs." },
      { heading: "Small markup, clear intent", body: "Prefer a real button for an action and an anchor for navigation. Use labels for form fields. These choices improve keyboard use and give assistive technology better information." },
    ],
    code: { language: "html", label: "A semantic page outline", source: "<main>\n  <h1>My learning journal</h1>\n  <section aria-labelledby=\"week-one\">\n    <h2 id=\"week-one\">Week one</h2>\n    <p>Today I built my first page.</p>\n    <a href=\"/projects\">See the project brief</a>\n  </section>\n</main>" },
    check: { question: "Which element should you use for an action that changes something on the page?", options: ["<button>", "<a>", "<span>"], answer: 0, feedback: "Use a button for an action. Use an anchor when the user is going to another location." },
    exercise: { prompt: "Write a simple outline for a page about a hobby: one main heading, two section headings, and one link.", hints: ["Start with <main>.", "Use one <h1> and two <h2> elements.", "Use an <a> element for the link."], solution: "<main><h1>My hobby</h1><section><h2>How I started</h2></section><section><h2>What I enjoy</h2><a href=\"/projects\">View my project</a></section></main>" },
    sources: [{ label: "MDN: HTML basics", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content" }],
  },
  {
    slug: "css-layout", pathSlug: "build-your-first-web-app", title: "Make a layout that adapts", duration: "32 min",
    summary: "Build a simple layout that remains readable on small and large screens.",
    objectives: ["Describe the difference between flex and grid", "Use a responsive rule to adjust a layout"],
    prerequisite: "Basic HTML elements and CSS selectors.",
    sections: [
      { heading: "Start with the content", body: "A good layout gives content room to breathe and keeps the reading order clear. Decide what should sit beside what, then choose a layout tool that fits." },
      { heading: "Flexbox for a row or column", body: "Flexbox is useful when items need to line up in one direction. It can distribute space and wrap items as the available width changes." },
      { heading: "Grid for two dimensions", body: "CSS Grid is useful when you want to define rows and columns together. A small media query can switch a two-column layout into a single column on narrow screens." },
    ],
    code: { language: "css", label: "One layout, two screen sizes", source: ".cards {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 1rem;\n}\n\n@media (max-width: 42rem) {\n  .cards { grid-template-columns: 1fr; }\n}" },
    check: { question: "Which CSS tool is designed to manage rows and columns together?", options: ["CSS Grid", "HTML forms", "JavaScript events"], answer: 0, feedback: "CSS Grid manages rows and columns together. Flexbox is especially handy for one-dimensional layouts." },
    exercise: { prompt: "Plan a card section with two columns on a wide screen and one column on a phone. Which rule changes the layout?", hints: ["Use Grid for the columns.", "Use a media query to target a narrower viewport.", "Change the columns to a single 1fr track."], solution: "Use grid-template-columns: repeat(2, 1fr) by default, then set grid-template-columns: 1fr inside a max-width media query." },
    sources: [{ label: "MDN: CSS layout", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout" }],
  },
  {
    slug: "javascript-interaction", pathSlug: "build-your-first-web-app", title: "Make a button do something", duration: "35 min",
    summary: "Connect a user action to a small, understandable response.",
    objectives: ["Find an element with JavaScript", "Respond to a click with an event listener"],
    prerequisite: "Basic HTML and a little JavaScript syntax.",
    sections: [
      { heading: "Behavior starts with an event", body: "A browser can report events such as clicks, typing, and form submission. JavaScript can listen for an event and run a function in response." },
      { heading: "Keep the first interaction small", body: "Find one element, listen for one event, and update one part of the page. Small steps make it easier to see what your code is doing and to debug it." },
      { heading: "Explain what changed", body: "A clear interface tells the user that an action worked. Update text, show a message, or change a visible state instead of leaving the result hidden." },
    ],
    code: { language: "js", label: "Listen for a click", source: "const button = document.querySelector('#hello');\nconst message = document.querySelector('#message');\n\nbutton.addEventListener('click', () => {\n  message.textContent = 'Nice work — your event ran.';\n});" },
    check: { question: "What does addEventListener help your code do?", options: ["Wait for a browser event", "Style a heading", "Load an image"], answer: 0, feedback: "addEventListener lets code respond when a browser event such as a click occurs." },
    exercise: { prompt: "Describe what should happen when a learner clicks a “Show tip” button. Which two page elements would your script need?", hints: ["The button is the source of the click.", "The tip needs a place to appear.", "Listen for a click, then update the tip element."], solution: "The script needs the button and a message element. It listens for a click and updates the message with the tip." },
    sources: [{ label: "MDN: Events", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events" }],
  },
  {
    slug: "accessible-forms", pathSlug: "build-your-first-web-app", title: "Make forms easier to use", duration: "28 min",
    summary: "Build a form with labels, helpful feedback, and a clear success state.",
    objectives: ["Connect labels to form controls", "Give useful feedback when an entry is missing"],
    prerequisite: "Semantic HTML and basic page structure.",
    sections: [
      { heading: "A label is part of the control", body: "Every input needs an understandable label. Connecting a label to its input gives the control a name and makes its clickable area easier to use." },
      { heading: "Be specific about errors", body: "Tell the learner what needs attention and how to fix it. Don’t rely on color alone: pair it with text, and keep focus near the field that needs action." },
      { heading: "Accessible by default", body: "Use native controls when they fit. They already support keyboard interaction and work with assistive technology. Add custom behavior only when it improves the experience." },
    ],
    code: { language: "html", label: "A labeled input", source: "<label for=\"email\">Email address</label>\n<input id=\"email\" name=\"email\" type=\"email\" required>\n<p id=\"email-help\">Use an address you can access.</p>" },
    check: { question: "What connects this label to its input?", options: ["The matching for and id values", "The CSS class name", "The placeholder text"], answer: 0, feedback: "The label’s for value should match the input’s id. A placeholder is not a substitute for a label." },
    exercise: { prompt: "A sign-up form rejects an empty email field. Write a short error message that tells the learner what to do.", hints: ["Name the field that needs attention.", "Say what format or value is expected.", "Avoid blame and keep the action clear."], solution: "“Enter your email address to continue.” is brief, specific, and gives the learner a next step." },
    sources: [{ label: "W3C WAI: Forms labels", url: "https://www.w3.org/WAI/tutorials/forms/labels/" }],
  },
  {
    slug: "git-and-debugging", pathSlug: "build-your-first-web-app", title: "Keep a trail of your work", duration: "36 min",
    summary: "Use Git to record progress and a simple method to investigate bugs.",
    objectives: ["Explain what a Git commit records", "Use a repeatable debugging loop"],
    prerequisite: "A small page or code example you can change.",
    sections: [
      { heading: "A commit is a checkpoint", body: "Git records a snapshot of selected file changes. A useful commit has a focused change and a message that says what changed. Checkpoints let you review how your project evolved." },
      { heading: "Debug in small steps", body: "First reproduce the issue. Then describe what you expected and what happened. Inspect the relevant code and browser console, change one thing, and try again." },
      { heading: "Share context with your future self", body: "A README can explain what the project does, how to open it, and what you learned. A clear project page makes your work easier for another person to understand." },
    ],
    code: { language: "bash", label: "A small Git checkpoint", source: "git status\ngit add index.html styles.css\ngit commit -m \"Add responsive homepage layout\"" },
    check: { question: "What makes a commit message useful?", options: ["It describes the change in a focused way", "It repeats the project title", "It includes every file name"], answer: 0, feedback: "A focused message helps you and collaborators understand why a checkpoint exists." },
    exercise: { prompt: "A button works in one browser but not another. Write down the first three things you would check before changing code.", hints: ["Make the issue happen again.", "Record what you expected and what happened.", "Inspect the browser console and the event code."], solution: "Reproduce it, note the expected and actual result, then inspect the console and the relevant event handler before changing one thing at a time." },
    sources: [{ label: "Git documentation", url: "https://git-scm.com/doc" }, { label: "Chrome DevTools: Debug JavaScript", url: "https://developer.chrome.com/docs/devtools/javascript" }],
  },
  {
    slug: "python-first-steps", pathSlug: "python-and-data-foundations", title: "Meet Python", duration: "12 min",
    summary: "Read a tiny Python program and see how values and names work.",
    objectives: ["Recognize a variable and a string", "Describe the output of a print call"],
    prerequisite: "None. This is a preview lesson.",
    sections: [
      { heading: "A program gives instructions", body: "Python is a programming language with readable syntax. A program is a set of instructions that a computer follows, one step at a time." },
      { heading: "Names make values useful", body: "A variable gives a name to a value. The name can help describe what the value means, so the next line of code is easier to understand." },
    ],
    code: { language: "python", label: "Store and display a value", source: "topic = \"city parks\"\nprint(f\"Today I am exploring {topic}.\")" },
    check: { question: "What does the name topic refer to in this example?", options: ["The string value city parks", "A Python library", "A file on disk"], answer: 0, feedback: "The variable topic refers to the string value “city parks”." },
    exercise: { prompt: "Write a sentence about something you want to measure, then name the piece of data you would need.", hints: ["Start with a question you care about.", "For example: which day had the most visitors?", "Think about what value you would record for each day."], solution: "For “Which day had the most visitors?”, you need a date and a visitor count for each day." },
    sources: [{ label: "Python tutorial", url: "https://docs.python.org/3/tutorial/" }],
  },
  {
    slug: "what-ai-can-and-cannot-do", pathSlug: "ai-foundations-and-applications", title: "A useful mental model for AI", duration: "14 min",
    summary: "Distinguish a model’s generated answer from a verified fact.",
    objectives: ["Describe a model as a component in a larger product", "Name one way to check an AI output"],
    prerequisite: "None. This is a preview lesson.",
    sections: [
      { heading: "A model is one part of a system", body: "A model learns patterns from examples and can produce likely outputs for new inputs. A product around it still needs an interface, data handling, instructions, quality checks, and a clear purpose." },
      { heading: "Fluent does not mean correct", body: "A generated answer may sound confident and still be incomplete or wrong. For important work, compare it with trusted sources, test the output, and keep a human responsible for the decision." },
    ],
    code: { language: "text", label: "Think in product components", source: "Input → Instructions → Model → Output → Check\n\nA useful product decides what to check before a person relies on the result." },
    check: { question: "Why should you check an AI-generated answer?", options: ["Fluent language can still be inaccurate", "AI always refuses to answer", "A model only works with images"], answer: 0, feedback: "Models can produce plausible but inaccurate answers. Verification is part of responsible use." },
    exercise: { prompt: "Think of an AI feature that summarizes a long article. What should a learner check before sharing its summary?", hints: ["Compare it with the original source.", "Look for missing or invented claims.", "Check that the summary preserves the important context."], solution: "Compare key claims with the article, look for missing context or unsupported details, and keep a link to the original source." },
    sources: [{ label: "NIST: AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" }],
  },
];

export const topics = [
  { name: "Web development", category: "Build for the web", level: "Beginner" as Level, status: "complete" as ContentStatus, description: "HTML, CSS, JavaScript, accessibility, and responsive interfaces.", resource: "https://developer.mozilla.org/en-US/docs/Learn_web_development", pathSlug: "build-your-first-web-app" },
  { name: "Python", category: "Python & data", level: "Beginner" as Level, status: "preview" as ContentStatus, description: "Readable programming basics, automation, data work, and beyond.", resource: "https://docs.python.org/3/tutorial/", pathSlug: "python-and-data-foundations" },
  { name: "Data analysis", category: "Python & data", level: "Beginner" as Level, status: "curated" as ContentStatus, description: "Ask useful questions, inspect data, and communicate what you find.", resource: "https://www.kaggle.com/learn" },
  { name: "AI foundations", category: "AI & machine learning", level: "Beginner" as Level, status: "preview" as ContentStatus, description: "Understand modern AI, its limits, evaluation, and responsible use.", resource: "https://huggingface.co/learn", pathSlug: "ai-foundations-and-applications" },
  { name: "AI applications", category: "AI & machine learning", level: "Intermediate" as Level, status: "preview" as ContentStatus, description: "Learn how models, prompts, data, tools, and evaluation fit together.", resource: "https://huggingface.co/learn", pathSlug: "ai-foundations-and-applications" },
  { name: "Databases & SQL", category: "Data & backend", level: "Beginner" as Level, status: "curated" as ContentStatus, description: "Model information, ask questions with SQL, and keep data consistent.", resource: "https://www.postgresql.org/docs/current/tutorial.html" },
  { name: "Backend & APIs", category: "Data & backend", level: "Intermediate" as Level, status: "coming-soon" as ContentStatus, description: "Create services that receive requests and return useful data." },
  { name: "Cloud & DevOps", category: "Infrastructure", level: "Intermediate" as Level, status: "curated" as ContentStatus, description: "Understand deployment, containers, automation, and cloud building blocks.", resource: "https://learn.microsoft.com/en-us/training/" },
  { name: "Cybersecurity foundations", category: "Infrastructure", level: "Beginner" as Level, status: "curated" as ContentStatus, description: "Learn defensive security, privacy, safe defaults, and threat awareness.", resource: "https://owasp.org/www-project-top-ten/" },
  { name: "Computer science", category: "Foundations", level: "Beginner" as Level, status: "curated" as ContentStatus, description: "Algorithms, operating systems, networks, and the ideas under the tools.", resource: "https://teachyourselfcs.com/" },
  { name: "Mobile development", category: "Build for people", level: "Intermediate" as Level, status: "coming-soon" as ContentStatus, description: "Plan and build responsive apps for phones and tablets." },
  { name: "Git & collaboration", category: "Foundations", level: "Beginner" as Level, status: "preview" as ContentStatus, description: "Keep a history of your work and collaborate with confidence.", resource: "https://git-scm.com/doc", pathSlug: "build-your-first-web-app" },
];

export const projects = [
  { slug: "personal-homepage", title: "A homepage that tells your story", pathSlug: "build-your-first-web-app", status: "complete" as ContentStatus, level: "Beginner", time: "2–4 hours", description: "Create a responsive personal homepage with a clear introduction, one project, and a way to get in touch.", skills: ["HTML", "CSS", "JavaScript", "Accessibility"], requirements: ["Use semantic headings and sections", "Adapt the layout for small screens", "Include one interactive detail", "Write a short README with a project description"], reflection: ["What part of the page are you most proud of?", "What did you change after testing on a smaller screen?"] },
  { slug: "data-story-preview", title: "Find a story in a small dataset", pathSlug: "python-and-data-foundations", status: "preview" as ContentStatus, level: "Beginner", time: "Coming soon", description: "Ask a clear question, inspect a small dataset, and explain one useful pattern.", skills: ["Python", "Data"], requirements: ["Choose a question", "Summarize the data", "Explain one finding"] , reflection: ["What surprised you?", "What would you collect next?"]},
  { slug: "ai-feature-map-preview", title: "Map a useful AI feature", pathSlug: "ai-foundations-and-applications", status: "preview" as ContentStatus, level: "Beginner", time: "Coming soon", description: "Describe where a model could help, what it should not decide, and how you would check its output.", skills: ["AI literacy", "Evaluation"], requirements: ["Name the user problem", "Describe the input and output", "Add a human check"] , reflection: ["What could go wrong?", "What evidence would build trust?"]},
];

export const statusLabels: Record<ContentStatus, string> = {
  complete: "Complete path", preview: "Preview", curated: "Curated resources", "coming-soon": "Coming soon",
};

export const getPath = (slug: string) => paths.find((path) => path.slug === slug);
export const getLesson = (slug: string) => lessons.find((lesson) => lesson.slug === slug);
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
