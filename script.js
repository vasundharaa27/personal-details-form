/* 👁 Toggle Password */
function togglePassword() {
  const pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
}

/* 🔐 Password Strength Check */
function checkPassword() {
  const pwd = document.getElementById("password").value;
  const msg = document.getElementById("passwordMsg");

  let rules = [];

  if (pwd.length < 10) rules.push("• Minimum 10 characters");
  if (!/[A-Z]/.test(pwd)) rules.push("• Add one CAPITAL letter");
  if (!/[0-9]/.test(pwd)) rules.push("• Add one number");
  if (!/[!@#$%^&*]/.test(pwd)) rules.push("• Add one special character (!@#$%^&*)");

  if (rules.length === 0) {
    msg.style.color = "green";
    msg.textContent = "✅ Strong password";
  } else {
    msg.style.color = "red";
    msg.innerHTML = rules.join("<br>");
  }
}

/* 🌍 Load Countries */
const countrySelect = document.getElementById("country");
countrySelect.innerHTML = "<option>Loading countries...</option>";

fetch("https://countriesnow.space/api/v0.1/countries/positions")
  .then(res => res.json())
  .then(data => {
    countrySelect.innerHTML = "<option value=''>Select Country</option>";
    data.data.forEach(item => {
      let option = document.createElement("option");
      option.value = item.name;
      option.text = item.name;
      countrySelect.add(option);
    });
  });

/* 🌍 Load States */
function getStates() {
  const stateSelect = document.getElementById("state");
  const districtSelect = document.getElementById("district");

  stateSelect.innerHTML = "<option>Loading states...</option>";
  districtSelect.innerHTML = "<option value=''>Select District</option>";

  fetch("https://countriesnow.space/api/v0.1/countries/states", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country: countrySelect.value })
  })
  .then(res => res.json())
  .then(data => {
    stateSelect.innerHTML = "<option value=''>Select State</option>";
    data.data.states.forEach(s => {
      let opt = document.createElement("option");
      opt.value = s.name;
      opt.text = s.name;
      stateSelect.add(opt);
    });
  });
}

/* 🌍 Load Districts */
function getCities() {
  const districtSelect = document.getElementById("district");

  districtSelect.innerHTML = "<option>Loading districts...</option>";

  fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      country: countrySelect.value,
      state: document.getElementById("state").value
    })
  })
  .then(res => res.json())
  .then(data => {
    districtSelect.innerHTML = "<option value=''>Select District</option>";
    data.data.forEach(city => {
      let opt = document.createElement("option");
      opt.value = city;
      opt.text = city;
      districtSelect.add(opt);
    });
  });
}
