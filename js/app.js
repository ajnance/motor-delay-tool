document.addEventListener("DOMContentLoaded", () => {
  const cardNew = document.getElementById("card-new");
  const cardResume = document.getElementById("card-resume");
  const ageYearsInput = document.getElementById("age-years");
  const ageMonthsInput = document.getElementById("age-months");
  const startBtn = document.getElementById("start-btn");

  const AGE_BRACKETS = [2, 4, 6, 9, 12, 15, 18, 24, 30, 36, 48, 60];

  function getTotalMonths() {
    const years = parseFloat(ageYearsInput.value) || 0;
    const months = parseFloat(ageMonthsInput.value) || 0;
    return Math.round(years * 12) + Math.round(months);
  }

  function getAgeCode() {
    const total = getTotalMonths();
    if (total < 2 || total > 60) return null;

    let bracket = AGE_BRACKETS[0];
    for (const b of AGE_BRACKETS) {
      if (b <= total) bracket = b;
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
        const { label } = JSON.parse(userAge);
        if (label) ageDisplay = label;
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

  if (ageYearsInput && startBtn) {
    ageYearsInput.addEventListener("input", updateStartBtn);
    ageMonthsInput.addEventListener("input", updateStartBtn);

    startBtn.addEventListener("click", () => {
      const code = getAgeCode();
      if (code) {
        const total = getTotalMonths();
        const years = Math.floor(total / 12);
        const months = total % 12;
        let label;
        if (years > 0 && months > 0) label = `${years} year${years !== 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`;
        else if (years > 0) label = `${years} year${years !== 1 ? "s" : ""}`;
        else label = `${months} month${months !== 1 ? "s" : ""}`;
        localStorage.setItem("mdt-user-age", JSON.stringify({ label }));
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
