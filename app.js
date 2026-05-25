const templates = {
  dentist: {
    title: "Dentist visit",
    steps: [
      ["Drive there", "We will ride to the dentist. I can bring something that helps me feel steady.", "icon-car"],
      ["Wait safely", "We may sit in a waiting room. I can use headphones or hold a hand.", "icon-chair"],
      ["Look at teeth", "The dentist may use gloves, a light, and a small mirror to look at my teeth.", "icon-mirror"],
      ["Ask for a break", "If I need to stop, I can raise my hand or point to my break card.", "icon-hand"],
      ["Finish and leave", "When the visit is done, we will go back home or to the next planned place.", "icon-home"],
      ["Celebrate effort", "I did something hard. My feelings are real and I can be proud.", "icon-star"]
    ],
    forecast: [
      ["Sound", "talking, chair movement, water spray, tool sounds"],
      ["Touch", "gloves, mirror, light pressure near mouth"],
      ["Waiting", "waiting room time may feel long"],
      ["Support", "headphones, hand squeeze, timer, first-then card"]
    ],
    feelings: "nervous, surprised, uncomfortable",
    helps: "headphones, hand squeeze, timer, first-then card"
  },
  haircut: {
    title: "Haircut preview",
    steps: [
      ["Enter slowly", "We will walk inside and find the chair. I can look around first.", "icon-chair"],
      ["Wear cape", "The cape may touch my neck. I can ask for it to be loose.", "icon-hand"],
      ["Hear scissors", "The scissors or clippers may make sounds near my ears.", "icon-mirror"],
      ["Ask for pause", "If my body feels upset, I can ask for a pause.", "icon-hand"],
      ["Check mirror", "I can look in the mirror when the haircut is done.", "icon-star"],
      ["Leave together", "After the haircut, we will leave together.", "icon-home"]
    ],
    forecast: [
      ["Sound", "clippers, scissors, hair dryer, talking"],
      ["Touch", "cape, comb, hair pieces on skin"],
      ["Waiting", "another person may go first"],
      ["Support", "neck towel, headphones, countdown, short pauses"]
    ],
    feelings: "worried, itchy, surprised",
    helps: "headphones, short pauses, soft towel, countdown"
  },
  school: {
    title: "School change",
    steps: [
      ["Hear the change", "An adult will tell me what is different today using calm words.", "icon-hand"],
      ["See the new plan", "I can look at the new order: first this, then that.", "icon-chair"],
      ["Pick support", "I can choose headphones, a quiet seat, or a helper nearby.", "icon-star"],
      ["Try the next step", "I only need to do one step at a time.", "icon-car"],
      ["Take a break", "If my body feels too full, I can ask for a break.", "icon-hand"],
      ["Come back", "After the break, I can return when I am ready.", "icon-home"]
    ],
    forecast: [
      ["Sound", "bell, hallway voices, classroom noise"],
      ["Touch", "crowded hallway, backpack, desk space"],
      ["Waiting", "schedule changes can feel unclear"],
      ["Support", "visual schedule, quiet corner, short choices"]
    ],
    feelings: "confused, worried, frustrated",
    helps: "visual schedule, quiet corner, short choices"
  },
  default: {
    title: "New moment",
    steps: [
      ["Start together", "A trusted person tells me where we are going and what will happen first.", "icon-hand"],
      ["Travel or enter", "I can move slowly and know where my safe person is.", "icon-car"],
      ["Notice sounds", "There may be sounds, people, or lights. I can use my support tools.", "icon-chair"],
      ["Do one step", "I can focus on one small step, not the whole day.", "icon-mirror"],
      ["Ask for help", "I can point, speak, or show a card when I need help or a break.", "icon-hand"],
      ["End the moment", "When it is finished, someone will tell me what happens next.", "icon-home"]
    ],
    forecast: [
      ["Sound", "voices, movement, waiting sounds"],
      ["Touch", "people nearby, new seat, different textures"],
      ["Waiting", "the plan may take longer than expected"],
      ["Support", "clear choices, break card, timer"]
    ],
    feelings: "unsure, tired, overwhelmed",
    helps: "clear choices, break card, timer"
  }
};

const baseChoices = [
  ["Break", "I need a break.", "II"],
  ["Too loud", "It is too loud.", "~"],
  ["Help", "Please help me.", "?"],
  ["Pain", "Something hurts.", "!"],
  ["No touch", "Please give me space.", "STOP"],
  ["Water", "I want water.", "H2O"],
  ["Bathroom", "I need the bathroom.", "WC"],
  ["Wait", "I need more time.", "..."],
  ["All done", "I am finished.", "OK"]
];

const defaultAssistCards = [
  { label: "Help", phrase: "I need help. Please stay with me.", visual: "HELP", kind: "body" },
  { label: "Water", phrase: "I want water.", visual: "WATER", kind: "need" },
  { label: "Bathroom", phrase: "I need the bathroom.", visual: "BATH", kind: "place" },
  { label: "Hurt", phrase: "Something hurts. Please help me.", visual: "HURT", kind: "body" },
  { label: "Too loud", phrase: "It is too loud. I need quiet.", visual: "LOUD", kind: "body" },
  { label: "Call family", phrase: "Please call my family.", visual: "CALL", kind: "person" }
];

const phraseParts = {
  "I feel": ["hurt", "scared", "mad", "tired", "sick", "confused"],
  "I want": ["water", "food", "home", "music", "toy", "hug"],
  "I need": ["break", "bathroom", "help", "quiet", "space", "more time"]
};

const clueOptions = [
  ["says sound only", "sound-word"],
  ["covers ears", "sound"],
  ["pulls away", "touch"],
  ["points to belly", "pain"],
  ["points at item", "point"],
  ["brings object", "object"],
  ["grabs your hand", "lead"],
  ["cries after waiting", "unclear"],
  ["repeats one word", "choice"],
  ["drops to floor", "overload"],
  ["pushes item away", "no"],
  ["grabs cup or fridge", "drink"]
];

const form = document.querySelector("#momentForm");
const storyGrid = document.querySelector("#storyGrid");
const choiceGrid = document.querySelector("#choiceGrid");
const passportList = document.querySelector("#passportList");
const storyTitle = document.querySelector("#storyTitle");
const passportName = document.querySelector("#passportName");
const readStory = document.querySelector("#readStory");
const forecastList = document.querySelector("#forecastList");
const firstStep = document.querySelector("#firstStep");
const thenStep = document.querySelector("#thenStep");
const rescueSteps = document.querySelector("#rescueSteps");
const changeSummary = document.querySelector("#changeSummary");
const readRescue = document.querySelector("#readRescue");
const translateButton = document.querySelector("#translateButton");
const translationOutput = document.querySelector("#translationOutput");
const copyPassport = document.querySelector("#copyPassport");
const phraseColumns = document.querySelector("#phraseColumns");
const phraseOutput = document.querySelector("#phraseOutput");
const speakPhrase = document.querySelector("#speakPhrase");
const clueGrid = document.querySelector("#clueGrid");
const guessOutput = document.querySelector("#guessOutput");
const soundInput = document.querySelector("#soundInput");
const objectInput = document.querySelector("#objectInput");
const gestureInput = document.querySelector("#gestureInput");
const decodeButton = document.querySelector("#decodeButton");
const decodeOutput = document.querySelector("#decodeOutput");
const assistCards = document.querySelector("#assistCards");
const caregiverToggle = document.querySelector("#caregiverToggle");
const caregiverSetup = document.querySelector("#caregiverSetup");
const cardLabel = document.querySelector("#cardLabel");
const cardPhrase = document.querySelector("#cardPhrase");
const cardKind = document.querySelector("#cardKind");
const cardPhoto = document.querySelector("#cardPhoto");
const addCard = document.querySelector("#addCard");
const currentStepIcon = document.querySelector("#currentStepIcon");
const currentStepTitle = document.querySelector("#currentStepTitle");
const currentStepText = document.querySelector("#currentStepText");
const prevStep = document.querySelector("#prevStep");
const nextStep = document.querySelector("#nextStep");
const speakStep = document.querySelector("#speakStep");

let currentPassportText = "";
let selectedStarter = "I want";
let selectedWord = "water";
let selectedClues = new Set();
let assistCardData = loadAssistCards();
let activeTemplate = templates.dentist;
let currentStepIndex = 0;

function loadAssistCards() {
  try {
    const saved = JSON.parse(localStorage.getItem("bridgeMomentsCards") || "[]");
    return [...defaultAssistCards, ...saved];
  } catch {
    return [...defaultAssistCards];
  }
}

function saveCustomCards() {
  const custom = assistCardData.slice(defaultAssistCards.length);
  localStorage.setItem("bridgeMomentsCards", JSON.stringify(custom));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function chooseTemplate(text) {
  const normalized = text.toLowerCase();
  if (normalized.includes("dentist") || normalized.includes("teeth") || normalized.includes("mouth")) return templates.dentist;
  if (normalized.includes("hair") || normalized.includes("barber") || normalized.includes("salon")) return templates.haircut;
  if (normalized.includes("school") || normalized.includes("bus") || normalized.includes("class")) return templates.school;
  return templates.default;
}

function simpleLine(line, style, name) {
  const named = line.replaceAll("I can", `${name} can`).replaceAll("my ", `${name}'s `);
  if (style === "extra-simple") return named.replaceAll("trusted person", "helper").split(".")[0] + ".";
  if (style === "direct") return named.replaceAll("may", "might");
  return named;
}

function renderStory(template, name, style) {
  storyTitle.textContent = template.title;
  storyGrid.innerHTML = template.steps
    .map(([title, body, icon], index) => `
      <article class="story-card">
        <div class="pictogram ${icon}" aria-hidden="true"></div>
        <div>
          <span class="step-number">Step ${index + 1}</span>
          <h3>${title}</h3>
          <p>${simpleLine(body, style, name)}</p>
        </div>
      </article>
    `)
    .join("");

  firstStep.textContent = template.steps[0][0];
  thenStep.textContent = template.steps[1][0];
}

function renderForecast(template) {
  forecastList.innerHTML = template.forecast
    .map(([label, body]) => `
      <div class="forecast-item">
        <strong>${label}</strong>
        <span>${body}</span>
      </div>
    `)
    .join("");
}

function renderChoices() {
  choiceGrid.innerHTML = baseChoices
    .map(([title, body, icon]) => `
      <button class="choice-card" type="button" data-say="${body}">
        <span class="choice-icon" aria-hidden="true">${icon}</span>
        <span>
          <h3>${title}</h3>
          <p>${body}</p>
        </span>
      </button>
    `)
    .join("");
}

function renderAssistCards() {
  assistCards.innerHTML = assistCardData
    .map((card, index) => {
      const visual = card.photo
        ? `<img src="${card.photo}" alt="">`
        : `<span>${escapeHtml(card.visual || card.label.slice(0, 6).toUpperCase())}</span>`;
      return `
        <button class="assist-card" type="button" data-card-index="${index}" data-kind="${card.kind}">
          <span class="assist-visual" aria-hidden="true">${visual}</span>
          <span>
            <span class="assist-label">${escapeHtml(card.label)}</span>
            <span class="assist-phrase">${escapeHtml(card.phrase)}</span>
          </span>
        </button>
      `;
    })
    .join("");
}

function renderCurrentStep() {
  const step = activeTemplate.steps[currentStepIndex] || activeTemplate.steps[0];
  currentStepIcon.textContent = String(currentStepIndex + 1);
  currentStepTitle.textContent = step[0];
  currentStepText.textContent = step[1];
}

function addCustomCard(photo) {
  const label = cardLabel.value.trim();
  const phrase = cardPhrase.value.trim();
  if (!label || !phrase) return;

  assistCardData.push({
    label,
    phrase,
    kind: cardKind.value,
    visual: label.slice(0, 6).toUpperCase(),
    photo
  });
  saveCustomCards();
  renderAssistCards();
  cardPhoto.value = "";
}

function renderPhraseBuilder() {
  phraseColumns.innerHTML = Object.entries(phraseParts)
    .map(([starter, words]) => `
      <div class="phrase-column">
        <h3>${starter}</h3>
        ${words
          .map((word) => `
            <button class="word-chip ${starter === selectedStarter && word === selectedWord ? "active" : ""}" type="button" data-starter="${starter}" data-word="${word}">
              ${word}
            </button>
          `)
          .join("")}
      </div>
    `)
    .join("");
  phraseOutput.textContent = `${selectedStarter} ${selectedWord}.`;
}

function renderClues() {
  clueGrid.innerHTML = clueOptions
    .map(([label, value]) => `
      <button class="clue-chip ${selectedClues.has(value) ? "active" : ""}" type="button" data-clue="${value}">
        ${label}
      </button>
    `)
    .join("");
  renderGuess();
}

function renderGuess() {
  const clues = [...selectedClues];
  let guess = "This may be a communication attempt, even if the word is not clear.";
  let action = "Get low, wait, repeat what you think, then offer two picture/object choices.";

  if (clues.includes("sound-word")) {
    guess = "They may be using a speech approximation.";
    action = "Treat the sound as meaningful. Match it with the object, place, or routine happening now.";
  } else if (clues.includes("object")) {
    guess = "Bringing an object may mean request, help, or show me.";
    action = "Say: 'You brought cup. Water or help?' Then show two choices.";
  } else if (clues.includes("lead")) {
    guess = "Grabbing your hand may mean come with me or do this for me.";
    action = "Follow safely, name what you see, and offer a simple yes/no.";
  } else if (clues.includes("point")) {
    guess = "Pointing may mean want, look, help, or no.";
    action = "Point too, name it, then ask one choice question.";
  } else if (clues.includes("sound")) {
    guess = "This may be sound overload.";
    action = "Offer headphones, quiet, or a break before asking more questions.";
  } else if (clues.includes("pain")) {
    guess = "This may be pain, hunger, or body discomfort.";
    action = "Ask yes/no body questions and consider checking with a caregiver or clinician.";
  } else if (clues.includes("drink")) {
    guess = "This may mean thirsty.";
    action = "Offer water and show the Water card.";
  } else if (clues.includes("touch")) {
    guess = "This may mean too close or no touch.";
    action = "Give space and explain before touching.";
  } else if (clues.includes("overload")) {
    guess = "This may be overload, not bad behavior.";
    action = "Lower demands, reduce noise, and use the plan-change rescue script.";
  } else if (clues.includes("choice")) {
    guess = "They may be trying to say one important word.";
    action = "Repeat the word back, then offer two picture choices.";
  }

  guessOutput.innerHTML = `<strong>${guess}</strong><span>${action}</span>`;
}

function decodeIntent() {
  const sound = soundInput.value.trim().toLowerCase();
  const object = objectInput.value.trim().toLowerCase();
  const gesture = gestureInput.value;
  const guesses = [];

  if (object.includes("cup") || object.includes("bottle") || sound.includes("wa") || sound.includes("oo")) {
    guesses.push("Maybe: water, thirsty, or help opening a drink.");
  }
  if (object.includes("shoe") || object.includes("door") || sound.includes("go")) {
    guesses.push("Maybe: go outside, leave, shoes on, or wants to go somewhere.");
  }
  if (object.includes("toy") || object.includes("remote") || object.includes("phone")) {
    guesses.push("Maybe: wants that item, needs help using it, or wants you to look.");
  }
  if (sound.includes("ss") || sound.includes("sh")) {
    guesses.push("Maybe: sound approximation for shoes, show, stop, sit, or something in the current routine.");
  }
  if (gesture === "grabbing hand") {
    guesses.push("Gesture clue: she may need you to follow, open, fix, reach, or do something for her.");
  }
  if (gesture === "pushing away") {
    guesses.push("Gesture clue: likely no, stop, all done, too close, or does not want it.");
  }
  if (gesture === "pointing") {
    guesses.push("Gesture clue: could mean want that, look there, help there, or something is wrong there.");
  }
  if (guesses.length === 0) {
    guesses.push("Maybe: request, discomfort, attention, or help. Use context and offer two choices.");
  }

  decodeOutput.innerHTML = `
    <strong>Try this response</strong>
    <span>Repeat the attempt: "${sound || "sound"}". Name the clue: "${object || gesture}". Then ask one simple choice: "Do you want it, or need help?"</span>
    <div class="decode-list">${guesses.map((item) => `<p>${item}</p>`).join("")}</div>
  `;
}

function renderRescue(name, change) {
  changeSummary.textContent = change;
  const steps = [
    ["This is different", "The plan changed. This is not your fault."],
    ["You are safe", `${name} is safe. A helper knows what is happening.`],
    ["New first then", "First we wait. Then we do the next planned step."],
    ["Choose support", `${name} can choose headphones, water, a seat, or a break.`],
    ["Check again", "A helper will say what happens next after a few minutes."]
  ];

  rescueSteps.innerHTML = steps
    .map(([title, body], index) => `
      <article class="rescue-step">
        <span>${index + 1}</span>
        <div>
          <h3>${title}</h3>
          <p>${body}</p>
        </div>
      </article>
    `)
    .join("");
}

function translateHardText(text, name) {
  const lower = text.toLowerCase();
  const lines = [];
  if (lower.includes("remain") || lower.includes("waiting")) lines.push(`${name} will wait in the waiting area.`);
  if (lower.includes("calls your name") || lower.includes("called")) lines.push(`A helper will say ${name}'s name when it is time.`);
  if (lower.includes("x-ray") || lower.includes("xray")) lines.push("They may take a picture of teeth. It does not hurt.");
  if (lower.includes("clean")) lines.push("They may clean teeth with water and tools.");
  if (lower.includes("exam")) lines.push("A helper will check what is needed.");
  if (lines.length === 0) {
    lines.push("Here is the simple version:");
    text.split(/[.!?]/).filter(Boolean).slice(0, 4).forEach((part) => lines.push(part.trim() + "."));
  }
  lines.push(`${name} can ask for help, more time, or a break.`);
  return lines;
}

function renderTranslation() {
  const name = document.querySelector("#personName").value || "Maya";
  const text = document.querySelector("#hardText").value;
  translationOutput.innerHTML = translateHardText(text, name)
    .map((line) => `<div class="simple-line">${line}</div>`)
    .join("");
}

function renderPassport(template, name, sensory) {
  passportName.textContent = name;
  document.querySelector(".avatar").textContent = name.trim().charAt(0).toUpperCase() || "M";
  const items = [
    ["How I communicate", "I may use sounds, word approximations, pointing, objects, gestures, or your hand to show what I mean."],
    ["How to understand me", "Treat every sound or gesture as communication. Look at the object, place, routine, and my body clues."],
    ["What may be hard", template.forecast.map((item) => item[1]).join("; ")],
    ["Signs I am overwhelmed", template.feelings],
    ["What helps me", `${template.helps}, ${sensory}`],
    ["Please avoid", "rushing me, correcting every sound, touching without warning, or asking many questions at once."],
    ["Best support", "Repeat what you think I meant, show 2 choices, wait, and accept pointing or objects as answers."]
  ];

  currentPassportText = `${name} - My Voice Passport\n` + items.map(([label, body]) => `${label}: ${body}`).join("\n");
  passportList.innerHTML = items
    .map(([label, body]) => `
      <div class="passport-item">
        <strong>${label}</strong>
        <span>${body}</span>
      </div>
    `)
    .join("");
}

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.84;
  utterance.pitch = 1.02;
  window.speechSynthesis.speak(utterance);
}

function updateApp() {
  const scenario = document.querySelector("#scenario").value;
  const name = document.querySelector("#personName").value || "Maya";
  const style = document.querySelector("#supportStyle").value;
  const sensory = document.querySelector("#sensory").value || "clear space";
  const change = document.querySelector("#changeInput").value || "The plan changed.";
  const template = chooseTemplate(scenario);
  activeTemplate = template;
  currentStepIndex = 0;

  renderStory(template, name, style);
  renderForecast(template);
  renderRescue(name, change);
  renderPassport(template, name, sensory);
  renderTranslation();
  renderCurrentStep();
}

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`#${tab.dataset.view}View`).classList.add("active");
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateApp();
});

choiceGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-say]");
  if (card) speak(card.dataset.say);
});

assistCards.addEventListener("click", (event) => {
  const button = event.target.closest("[data-card-index]");
  if (!button) return;
  const card = assistCardData[Number(button.dataset.cardIndex)];
  if (card) speak(card.phrase);
});

caregiverToggle.addEventListener("click", () => {
  caregiverSetup.classList.toggle("open");
});

addCard.addEventListener("click", () => {
  const file = cardPhoto.files && cardPhoto.files[0];
  if (!file) {
    addCustomCard("");
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => addCustomCard(reader.result));
  reader.readAsDataURL(file);
});

prevStep.addEventListener("click", () => {
  currentStepIndex = Math.max(0, currentStepIndex - 1);
  renderCurrentStep();
  speak(currentStepText.textContent);
});

nextStep.addEventListener("click", () => {
  currentStepIndex = Math.min(activeTemplate.steps.length - 1, currentStepIndex + 1);
  renderCurrentStep();
  speak(currentStepText.textContent);
});

speakStep.addEventListener("click", () => {
  speak(`${currentStepTitle.textContent}. ${currentStepText.textContent}`);
});

readStory.addEventListener("click", () => {
  const text = [...document.querySelectorAll(".story-card p")].map((item) => item.textContent).join(" ");
  speak(text);
});

readRescue.addEventListener("click", () => {
  const text = [...document.querySelectorAll(".rescue-step p")].map((item) => item.textContent).join(" ");
  speak(text);
});

translateButton.addEventListener("click", renderTranslation);

decodeButton.addEventListener("click", decodeIntent);

phraseColumns.addEventListener("click", (event) => {
  const button = event.target.closest("[data-starter]");
  if (!button) return;
  selectedStarter = button.dataset.starter;
  selectedWord = button.dataset.word;
  renderPhraseBuilder();
});

clueGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-clue]");
  if (!button) return;
  const clue = button.dataset.clue;
  if (selectedClues.has(clue)) {
    selectedClues.delete(clue);
  } else {
    selectedClues.add(clue);
  }
  renderClues();
});

speakPhrase.addEventListener("click", () => {
  speak(phraseOutput.textContent);
});

copyPassport.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentPassportText);
    copyPassport.textContent = "Copied";
    setTimeout(() => {
      copyPassport.textContent = "Copy";
    }, 1200);
  } catch {
    speak(currentPassportText);
  }
});

renderChoices();
renderAssistCards();
renderPhraseBuilder();
renderClues();
decodeIntent();
updateApp();
