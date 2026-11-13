const state = {
  verificationCode: "482931",
  plan: "Free",
  companionName: "Luna",
  mood: "calm",
};

const signupForm = document.getElementById("signupForm");
const verifyForm = document.getElementById("verifyForm");
const surveyForm = document.getElementById("surveyForm");
const companionForm = document.getElementById("companionForm");
const chatForm = document.getElementById("chatForm");
const contactInput = document.getElementById("contactInput");
const codeInput = document.getElementById("codeInput");
const verifyMessage = document.getElementById("verifyMessage");
const companionNameInput = document.getElementById("companionNameInput");
const planBadge = document.getElementById("planBadge");
const usageLabel = document.getElementById("usageLabel");
const welcomeName = document.getElementById("welcomeName");
const companionDisplayName = document.getElementById("companionDisplayName");
const chatMessages = document.getElementById("chatMessages");

function addMessage(text, sender = "ai") {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${sender}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateCompanionUI() {
  const name = state.companionName || "Luna";
  welcomeName.textContent = name;
  companionDisplayName.textContent = name;
  companionNameInput.value = name;
}

function updatePlanUI() {
  planBadge.textContent = state.plan === "Pro" ? "24/7 plan" : "Free plan";
  usageLabel.textContent = state.plan === "Pro" ? "Unlimited access" : "15–30 minutes free";
}

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = contactInput.value.trim();
  if (!value) return;

  verifyMessage.textContent = `Demo only — no code is actually sent. For this prototype, enter ${state.verificationCode}.`;
  document.getElementById("verifyCard").classList.add("active");
  document.getElementById("accountCard").classList.remove("active");
  codeInput.focus();
});

verifyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (codeInput.value.trim() === state.verificationCode) {
    document.getElementById("surveyCard").classList.add("active");
    document.getElementById("verifyCard").classList.remove("active");
    alert("Prototype account verified.");
  } else {
    alert("That demo code is incorrect. Please try again.");
  }
});

surveyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("nameCard").classList.add("active");
  document.getElementById("surveyCard").classList.remove("active");
  addMessage("Your preferences are saved. I’m setting up a companion that fits your rhythm.", "ai");
});

companionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.companionName = companionNameInput.value.trim() || "Luna";
  updateCompanionUI();
  document.getElementById("nameCard").classList.remove("active");
  document.getElementById("dashboard").scrollIntoView({ behavior: "smooth", block: "start" });
  addMessage(`Nice to meet you. I’m ${state.companionName}, and I’m ready to listen.`, "ai");
});

const moodButtons = document.querySelectorAll(".mood-btn");
moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    moodButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const selectedMood = button.dataset.mood || "calm";
    state.mood = selectedMood;

    const moodResponses = {
      happy: "I can feel the joy in your energy. Tell me what is going well right now.",
      calm: "That sounds peaceful. What helps you stay grounded today?",
      stressed: "You don’t have to carry it alone. What feels heaviest right now?",
      lonely: "I’m here with you. Would you like to talk about what you’re craving most today?",
    };
    addMessage(moodResponses[selectedMood] || moodResponses.calm, "ai");
  });
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("chatInput");
  const value = input.value.trim();
  if (!value) return;

  addMessage(value, "user");
  input.value = "";

  const moodReplies = {
    happy: "That sounds uplifting. What part of your day feels most meaningful right now?",
    stressed: "Let’s take this one step at a time. Can we simplify what feels most stressful?",
    lonely: "I’m with you. Would it help to talk about what kind of connection you’re craving today?",
    calm: "That feels grounded. Want to explore what’s bringing you peace or what you want more of today?",
  };
  window.setTimeout(() => addMessage(moodReplies[state.mood] || moodReplies.calm, "ai"), 400);
});

document.querySelectorAll("[data-scroll]").forEach((element) => {
  element.addEventListener("click", () => {
    const target = document.querySelector(element.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById("premiumPlanBtn").addEventListener("click", () => {
  state.plan = "Pro";
  updatePlanUI();
  addMessage("Demo only — checkout is not connected. Your membership has not been purchased.", "ai");
});

updateCompanionUI();
updatePlanUI();
