document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const age = params.get("age") || "18m";
  const data = getSkillsForAge(age);

  if (!data) {
    document.querySelector(".assessment").innerHTML = "<p>No data available for this age group.</p>";
    return;
  }

  const sections = data.sections;
  const sectionSteps = sections.map(s => s.id);
  const startSection = parseInt(params.get("section") || "0", 10);
  let currentSectionIndex = Math.min(startSection, sectionSteps.length - 1);
  const answers = {};

  const stepper = initProgressStepper({
    steps: getStepsForAge(age),
    activeSteps: sectionSteps,
    activeIndex: currentSectionIndex,
    rootPath: "",
    onStepChange: (newIndex) => {
      saveCurrentAnswers();
      currentSectionIndex = newIndex;
      stepper.render();
      renderSection();
      window.scrollTo(0, 0);
    },
    onStepClick: (stepId) => {
      saveCurrentAnswers();
      if (stepId === "start") {
        window.location.href = "index.html";
      } else if (stepId === "summary") {
        window.location.href = `summary.html?age=${encodeURIComponent(age)}`;
      }
    }
  });

  function renderSkillCard(skill, sectionId) {
    const key = `${sectionId}__${skill.id}`;
    const savedAnswer = answers[key]?.answer || "";
    const savedNotes = answers[key]?.notes || "";
    const infoIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="0.5" fill="currentColor"/></svg>`;

    const isConcern = sectionId === "concerns";

    const options = isConcern
      ? [
          { value: "has-concern", label: "I have this concern" },
          { value: "no-concern", label: "I do not have this concern" },
          { value: "unsure", label: "Unsure" }
        ]
      : [
          { value: "can-do", label: "Can do this" },
          { value: "does-not", label: "Does not do this" },
          { value: "used-to", label: "Used to do but no longer does" },
          { value: "unsure", label: "Unsure" }
        ];

    const optionsHtml = options.map(opt => `
      <label class="radio-option">
        <input type="radio" name="${key}" value="${opt.value}" ${savedAnswer === opt.value ? "checked" : ""}>
        ${opt.label}
      </label>`).join("");

    const placeholderSvg = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b0aeb5" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`;
    const rightContent = isConcern
      ? `<img src="assets/eye.svg" alt="" class="skill-card__icon">`
      : `<div class="image-placeholder">${placeholderSvg}</div>`;

    return `
      <div class="skill-card" data-skill="${key}">
        <div class="skill-card__layout">
          <div class="skill-card__left">
            <h4 class="skill-card__title">${isConcern ? "Concern" : "Skill"}: <span>${skill.name}</span></h4>
            <p class="skill-card__desc">${skill.description}</p>
            <p class="skill-card__tryit"><strong>Try it:</strong> ${skill.tryIt}</p>
            <div class="skill-card__options">
              ${optionsHtml}
            </div>
            <div class="skill-card__notes-section">
              <label class="skill-card__notes-label">Notes for Pediatrician ${infoIcon}</label>
              <textarea class="skill-card__notes" data-key="${key}" placeholder="">${savedNotes}</textarea>
            </div>
          </div>
          <div class="skill-card__right">
            ${rightContent}
          </div>
        </div>
      </div>`;
  }

  function renderSection() {
    const section = sections[currentSectionIndex];
    const container = document.getElementById("assessment-content");

    const skillCards = section.skills.map(skill => renderSkillCard(skill, section.id)).join("");

    const savedConcernNotes = answers[`${section.id}__additional-notes`]?.notes || "";
    const additionalNotesHtml = section.id === "concerns" ? `
      <div class="skill-card concern-additional-notes">
        <h4 class="skill-card__title">Additional Concern Notes for the Pediatrician</h4>
        <p class="skill-card__desc">Use this space to share any other concerns about your child's movement or development that you'd like your pediatrician to know about.</p>
        <textarea class="skill-card__notes" data-key="${section.id}__additional-notes" placeholder="Add any additional notes here...">${savedConcernNotes}</textarea>
      </div>` : "";

    container.innerHTML = `
      <h2 class="assessment__section-title">${section.title}</h2>
      ${skillCards}
      ${additionalNotesHtml}
      <div class="assessment__nav">
        ${currentSectionIndex > 0 ? `<button class="btn btn--m btn--outline" id="nav-prev">Previous</button>` : ""}
        ${currentSectionIndex < sectionSteps.length - 1
          ? `<button class="btn btn--m btn--filled" id="nav-next">Next</button>`
          : `<button class="btn btn--m btn--filled" id="nav-next">View Summary</button>`}
      </div>`;

    container.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener("click", () => {
        const key = radio.name;
        if (answers[key]?.answer === radio.value) {
          radio.checked = false;
          answers[key].answer = "";
        } else {
          if (!answers[key]) answers[key] = {};
          answers[key].answer = radio.value;
        }
      });
    });

    const prevBtn = document.getElementById("nav-prev");
    const nextBtn = document.getElementById("nav-next");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        saveCurrentAnswers();
        currentSectionIndex--;
        stepper.setIndex(currentSectionIndex);
        renderSection();
        window.scrollTo(0, 0);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        saveCurrentAnswers();
        if (currentSectionIndex < sectionSteps.length - 1) {
          currentSectionIndex++;
          stepper.setIndex(currentSectionIndex);
          renderSection();
          window.scrollTo(0, 0);
        } else {
          window.location.href = `summary.html?age=${encodeURIComponent(age)}`;
        }
      });
    }
  }

  function saveCurrentAnswers() {
    document.querySelectorAll(".skill-card").forEach(card => {
      const key = card.dataset.skill;
      if (!key) return;
      const radio = card.querySelector(`input[name="${key}"]:checked`);
      const notes = card.querySelector("textarea")?.value || "";
      answers[key] = {
        answer: radio ? radio.value : "",
        notes: notes
      };
    });
    // Save additional concern notes (stored by its textarea's data-key)
    document.querySelectorAll(".concern-additional-notes textarea").forEach(ta => {
      const key = ta.dataset.key;
      if (key) answers[key] = { answer: "", notes: ta.value };
    });
    localStorage.setItem(`mdt-answers-${age}`, JSON.stringify(answers));
  }

  function loadAnswers() {
    const saved = localStorage.getItem(`mdt-answers-${age}`);
    if (saved) {
      Object.assign(answers, JSON.parse(saved));
    }
  }

  let displayAge = data.ageLabel;
  const userAgeStored = localStorage.getItem("mdt-user-age");
  if (userAgeStored) {
    try {
      const { label } = JSON.parse(userAgeStored);
      if (label) displayAge = label;
    } catch (e) {}
  }
  document.getElementById("hero-subtitle").textContent = `Reviewing skills for age: ${displayAge}`;

  loadAnswers();
  renderSection();
});
