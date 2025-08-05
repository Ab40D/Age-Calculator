const DateTime = luxon.DateTime;

let selectedDate = null;

// Init flatpickr
flatpickr("#birthdate", {
  dateFormat: "d/m/Y",
  altInput: true,
  altFormat: "d/m/Y",
  // maxDate: "today", // Optional
  onChange: function (selectedDates) {
    selectedDate = selectedDates[0]; 
  }
});

document.getElementById("ageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const result = document.getElementById("result");
  const gender = document.getElementById("gender").value;

  if (!selectedDate) {
    result.innerHTML = "❌ Please select a valid birthdate.";
    return;
  }

  const birthDate = DateTime.fromJSDate(selectedDate);
  const now = DateTime.now();

  if (birthDate > now) {
    result.innerHTML = "⚠️ Birthdate cannot be in the future!";
    return;
  }

  const diff = now.diff(birthDate, ['years', 'months', 'days']).toObject();
  const years = Math.floor(diff.years);
  const months = Math.floor(diff.months);
  const days = Math.floor(diff.days);

  // Age category
  let ageCategory = "";
  if (years < 13) {
    ageCategory = "a kid";
  } else if (years < 20) {
    ageCategory = "a teenager";
  } else if (years < 60) {
    ageCategory = "an adult";
  } else {
    ageCategory = "a senior";
  }

  // Gender label
  let genderText = "";
  if (gender === "male") {
    genderText = "man";
  } else if (gender === "female") {
    genderText = "woman";
  }

  // Basic result
  result.innerHTML = `
    🎂 You are <strong>${years} years, ${months} months, ${days} days</strong> old.<br>
    🧠 You are ${ageCategory} ${genderText ? `(${genderText})` : ""}.
  `;

  // Extra messages
  if (years < 18) {
    result.innerHTML += "<br>💡 Enjoy your youth, and stay curious!";
  } else if (years > 60) {
    result.innerHTML += "<br>🧓 Wisdom is your superpower!";
  }

  result.innerHTML += "<br>🌟 Age is just a number, keep shining!";

  // 🔥 Special message for Imadd (born 26/08/2003)
  const imaddBirthday = DateTime.fromISO("2003-08-26");
  if (
    birthDate.hasSame(imaddBirthday, 'day') &&
    birthDate.hasSame(imaddBirthday, 'month') &&
    birthDate.hasSame(imaddBirthday, 'year')
  ) {
    result.innerHTML += "<br>🎉 Yo Imadd! You're not just aging, you're leveling up like a legend! 🚀 Stay chill, bro!";
  }
});
