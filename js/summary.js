document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const age = params.get("age") || "18m";
  const data = getSkillsForAge(age);

  if (!data) {
    document.getElementById("summary-skills").innerHTML = '<p class="summary__empty">No data available for this age group.</p>';
    return;
  }

  const sectionSteps = data.sections.map(s => s.id);
  const allActiveSteps = [...sectionSteps, "summary"];

  initProgressStepper({
    steps: getStepsForAge(age),
    activeSteps: allActiveSteps,
    activeIndex: allActiveSteps.length - 1,
    rootPath: "",
    onStepChange: (newIndex) => {
      if (newIndex < sectionSteps.length) {
        window.location.href = `assessment.html?age=${encodeURIComponent(age)}&section=${newIndex}`;
      }
    },
    onStepClick: (stepId) => {
      if (stepId === "start") {
        window.location.href = "index.html";
      }
    }
  });

  let displayAge = data.ageLabel;
  const userAgeStored = localStorage.getItem("mdt-user-age");
  if (userAgeStored) {
    try {
      const { label } = JSON.parse(userAgeStored);
      if (label) displayAge = label;
    } catch (e) {}
  }
  document.getElementById("summary-age").textContent = `Child age: ${displayAge}`;

  const saved = localStorage.getItem(`mdt-answers-${age}`);
  const answers = saved ? JSON.parse(saved) : {};

  const flaggedAnswers = ["does-not", "used-to", "unsure", "has-concern"];

  const sectionMap = {};
  data.sections.forEach(section => {
    section.skills.forEach(skill => {
      const key = `${section.id}__${skill.id}`;
      const entry = answers[key];
      if (entry && flaggedAnswers.includes(entry.answer)) {
        if (!sectionMap[section.id]) {
          sectionMap[section.id] = { section, items: [] };
        }
        sectionMap[section.id].items.push({
          skill,
          answer: entry.answer,
          notes: entry.notes || "",
          key
        });
      }
    });
  });

  const container = document.getElementById("summary-skills");

  if (Object.keys(sectionMap).length === 0) {
    container.innerHTML = '<p class="summary__empty">No flagged skills found. All skills were marked as "Can do this" or were not answered.</p>';
    return;
  }

  let html = "";

  Object.values(sectionMap).forEach(({ section, items }) => {
    const step = getStepsForAge(age).find(s => s.id === section.id);
    const iconSrc = step ? `assets/${step.icon}.svg` : "";

    html += `<div class="summary__section">`;
    html += `<h3 class="summary__section-title">`;
    if (iconSrc) html += `<img class="summary__section-icon" src="${iconSrc}" alt="">`;
    html += `${section.title}</h3>`;

    const isConcernsSection = section.id === "concerns";
    const grouped = isConcernsSection
      ? { "has-concern": [], "unsure": [] }
      : { "does-not": [], "used-to": [], "unsure": [] };
    items.forEach(item => {
      if (grouped[item.answer] !== undefined) grouped[item.answer].push(item);
    });

    // Show additional concern notes if present
    if (isConcernsSection) {
      const additionalKey = `${section.id}__additional-notes`;
      const additionalEntry = answers[additionalKey];
      if (additionalEntry?.notes?.trim()) {
        html += `<div class="summary__skill summary__skill--additional-notes">`;
        html += `<h4 class="summary__skill-name">Additional Concern Notes</h4>`;
        html += `<p class="summary__skill-desc">${additionalEntry.notes}</p>`;
        html += `</div>`;
      }
    }

    Object.entries(grouped).forEach(([answer, skills]) => {
      if (skills.length === 0) return;

      const badgeLabel = {
        "does-not": "Does not do",
        "used-to": "Used to do but no longer does",
        "unsure": "Unsure",
        "has-concern": "Has concern"
      }[answer];

      const badgeClass = {
        "does-not": "summary__badge--does-not",
        "used-to": "summary__badge--used-to",
        "unsure": "summary__badge--unsure",
        "has-concern": "summary__badge--does-not"
      }[answer];

      html += `<span class="summary__badge ${badgeClass}">${badgeLabel}</span>`;

      skills.forEach(({ skill, notes, key }) => {
        html += `<div class="summary__skill">`;
        html += `<h4 class="summary__skill-name">${isConcernsSection ? "Concern" : "Skill"}: ${skill.name}</h4>`;
        html += `<p class="summary__skill-desc">${skill.description}</p>`;

        if (answer === "unsure") {
          html += `<p class="summary__skill-tryit"><strong>Try it:</strong> ${skill.tryIt}</p>`;
        }

        html += `<label class="summary__notes-label">Notes for Pediatrician</label>`;
        html += `<textarea class="summary__notes" data-key="${key}">${notes}</textarea>`;
        html += `</div>`;
      });
    });

    html += `</div>`;
  });

  container.innerHTML = html;

  container.querySelectorAll(".summary__notes").forEach(textarea => {
    textarea.addEventListener("input", () => {
      const key = textarea.dataset.key;
      if (answers[key]) {
        answers[key].notes = textarea.value;
      } else {
        answers[key] = { answer: "", notes: textarea.value };
      }
      localStorage.setItem(`mdt-answers-${age}`, JSON.stringify(answers));
    });
  });

  document.getElementById("btn-new-check").addEventListener("click", () => {
    ["2m","4m","6m","9m","12m","15m","18m","24m","30m","36m","48m","60m"].forEach(a => {
      localStorage.removeItem(`mdt-answers-${a}`);
    });
    localStorage.removeItem("mdt-user-age");
    window.location.href = "index.html";
  });

  document.getElementById("btn-download").addEventListener("click", () => {
    alert("Download functionality coming soon.");
  });
});
