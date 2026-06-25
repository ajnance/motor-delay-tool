document.addEventListener("DOMContentLoaded", () => {
  const cardNew = document.getElementById("card-new");
  const cardResume = document.getElementById("card-resume");
  const ageNumber = document.getElementById("age-number");
  const ageUnit = document.getElementById("age-unit");
  const startBtn = document.getElementById("start-btn");

  const AGE_BRACKETS = [2, 4, 6, 9, 12, 15, 18, 24, 30, 36, 48, 60];

  function getAgeCode() {
    const val = parseFloat(ageNumber.value);
    if (!val || val <= 0) return null;

    const months = ageUnit.value === "years" ? Math.round(val * 12) : Math.round(val);
    if (months < 2 || months > 60) return null;

    let bracket = AGE_BRACKETS[0];
    for (const b of AGE_BRACKETS) {
      if (b <= months) bracket = b;
      else break;
    }
    return bracket + "m";
  }

  function updateStartBtn() {
    startBtn.disabled = !getAgeCode();
  }

  const savedAge = findSavedAge();

  if (savedAge) {
    cardNew.style.display = "none";
    cardResume.style.display = "";

    let ageDisplay = savedAge;
    const userAge = localStorage.getItem("mdt-user-age");
    if (userAge) {
      try {
        const { value, unit } = JSON.parse(userAge);
        const label = unit === "years"
          ? `${value} ${value === 1 ? "year" : "year"}`
          : `${value} ${value === 1 ? "month" : "month"}`;
        ageDisplay = label;
      } catch (e) {}
    }
    document.getElementById("resume-desc").innerHTML =
      `You have a <strong>${ageDisplay}</strong> motor skills check in progress.`;

    document.getElementById("btn-continue").addEventListener("click", () => {
      window.location.href = `assessment.html?age=${encodeURIComponent(savedAge)}`;
    });

    document.getElementById("btn-start-new").addEventListener("click", () => {
      ["2m","4m","6m","9m","12m","15m","18m","24m","30m","36m","48m","60m"].forEach(a => {
        localStorage.removeItem(`mdt-answers-${a}`);
      });
      localStorage.removeItem("mdt-user-age");
      cardResume.style.display = "none";
      cardNew.style.display = "";
    });
  }

  if (ageNumber && startBtn) {
    ageNumber.addEventListener("input", updateStartBtn);
    ageUnit.addEventListener("change", updateStartBtn);

    startBtn.addEventListener("click", () => {
      const code = getAgeCode();
      if (code) {
        const val = parseFloat(ageNumber.value);
        const unit = ageUnit.value;
        localStorage.setItem("mdt-user-age", JSON.stringify({ value: val, unit }));
        window.location.href = `assessment.html?age=${encodeURIComponent(code)}`;
      }
    });
  }

  function findSavedAge() {
    const ages = ["2m","4m","6m","9m","12m","15m","18m","24m","30m","36m","48m","60m"];
    for (const age of ages) {
      const saved = localStorage.getItem(`mdt-answers-${age}`);
      if (saved) {
        try {
          const answers = JSON.parse(saved);
          if (Object.keys(answers).length > 0) return age;
        } catch (e) {}
      }
    }
    return null;
  }
});
