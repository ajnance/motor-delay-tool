function renderProgressStepper(rootPath = "") {
  const chevronLeft = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>`;
  const chevronRight = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>`;
  const chevronDown = `<svg class="stepper__display-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`;

  return `
    <div class="stepper">
      <div class="stepper__inner">
        <button class="stepper__arrow" id="stepper-prev" aria-label="Previous step">${chevronLeft}</button>
        <div class="stepper__track" id="stepper-track"></div>
        <button class="stepper__arrow" id="stepper-next" aria-label="Next step">${chevronRight}</button>
        <div class="stepper__dropdown" id="stepper-dropdown">
          <button class="stepper__dropdown-btn" id="mobile-prev" aria-label="Previous step">${chevronLeft}</button>
          <div class="stepper__select-wrap">
            <div class="stepper__display" id="stepper-display">
              <img class="stepper__display-icon" id="stepper-display-icon" src="" alt="">
              <span id="stepper-display-label"></span>
              ${chevronDown}
            </div>
            <select class="stepper__select" id="stepper-select"></select>
          </div>
          <button class="stepper__dropdown-btn" id="mobile-next" aria-label="Next step">${chevronRight}</button>
        </div>
      </div>
    </div>`;
}

function initProgressStepper(options = {}) {
  const {
    steps = ALL_STEPS,
    activeSteps = [],
    activeIndex = 0,
    rootPath = "",
    onStepChange = () => {},
    onStepClick = null
  } = options;

  let currentIndex = activeIndex;

  function getActiveId() {
    return activeSteps[currentIndex];
  }

  function render() {
    const container = document.getElementById("stepper-track");
    const activeId = getActiveId();

    const stepElements = [];
    steps.forEach((step, i) => {
      const sectionIdx = activeSteps.indexOf(step.id);
      let cls = "stepper__step";
      if (step.id === activeId) cls += " stepper__step--active";
      else if (sectionIdx !== -1 && sectionIdx < currentIndex) cls += " stepper__step--completed";

      stepElements.push(`
        <button class="${cls}" data-step="${step.id}">
          <span class="stepper__icon"><img src="${rootPath}assets/${step.icon}.svg" alt="${step.label}"></span>
          <span class="stepper__label">${step.label}</span>
        </button>`);

      if (i < steps.length - 1) {
        stepElements.push(`<span class="stepper__line"></span>`);
      }
    });

    container.innerHTML = stepElements.join("");

    container.querySelectorAll(".stepper__step").forEach(btn => {
      btn.addEventListener("click", () => {
        const stepId = btn.dataset.step;
        const idx = activeSteps.indexOf(stepId);
        if (idx !== -1) {
          currentIndex = idx;
          onStepChange(currentIndex);
        } else if (onStepClick) {
          onStepClick(stepId);
        }
      });
    });

    const activeStep = steps.find(s => s.id === activeId);
    const dropdownSelect = document.getElementById("stepper-select");
    const dropdownIds = steps
      .filter(s => activeSteps.includes(s.id) || (onStepClick && (s.id === "summary" || s.id === "start")))
      .map(s => s.id);
    dropdownSelect.innerHTML = dropdownIds.map(id => {
      const step = steps.find(s => s.id === id);
      return `<option value="${id}" ${id === activeId ? "selected" : ""}>${step ? step.label : id}</option>`;
    }).join("");

    const displayIcon = document.getElementById("stepper-display-icon");
    const displayLabel = document.getElementById("stepper-display-label");
    if (activeStep) {
      displayIcon.src = `${rootPath}assets/${activeStep.icon}.svg`;
      displayIcon.alt = activeStep.label;
      displayLabel.textContent = activeStep.label;
    }

    const prevArrow = document.getElementById("stepper-prev");
    const nextArrow = document.getElementById("stepper-next");
    const mobilePrev = document.getElementById("mobile-prev");
    const mobileNext = document.getElementById("mobile-next");

    prevArrow.disabled = currentIndex === 0;
    nextArrow.disabled = currentIndex === activeSteps.length - 1;
    mobilePrev.disabled = currentIndex === 0;
    mobileNext.disabled = currentIndex === activeSteps.length - 1;
  }

  function navigate(delta) {
    const newIdx = currentIndex + delta;
    if (newIdx >= 0 && newIdx < activeSteps.length) {
      currentIndex = newIdx;
      onStepChange(currentIndex);
    }
  }

  function setIndex(idx) {
    currentIndex = idx;
    render();
  }

  document.getElementById("stepper-prev").addEventListener("click", () => navigate(-1));
  document.getElementById("stepper-next").addEventListener("click", () => navigate(1));
  document.getElementById("mobile-prev").addEventListener("click", () => navigate(-1));
  document.getElementById("mobile-next").addEventListener("click", () => navigate(1));

  document.getElementById("stepper-select").addEventListener("change", (e) => {
    const stepId = e.target.value;
    const idx = activeSteps.indexOf(stepId);
    if (idx !== -1) {
      currentIndex = idx;
      onStepChange(currentIndex);
    } else if (onStepClick) {
      onStepClick(stepId);
    }
  });

  render();

  return { render, setIndex, navigate };
}
