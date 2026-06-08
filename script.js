const statesAndLGAs = {
  Abia: [
    "Aba North",
    "Aba South",
    "Arochukwu",
    "Bende",
    "Ikwuano",
    "Isiala Ngwa North",
    "Isiala Ngwa South",
    "Isuikwuato",
    "Obi Ngwa",
    "Ohafia",
    "Osisioma",
    "Ugwunagbo",
    "Ukwa East",
    "Ukwa West",
    "Umuahia North",
    "Umuahia South",
    "Umu Nneochi",
  ],
  Anambra: [
    "Aguata",
    "Anambra East",
    "Anambra West",
    "Anaocha",
    "Awka North",
    "Awka South",
    "Ayamelum",
    "Dunukofia",
    "Ekwusigo",
    "Idemili North",
    "Idemili South",
    "Ihiala",
    "Njikoka",
    "Nnewi North",
    "Nnewi South",
    "Ogbaru",
    "Onitsha North",
    "Onitsha South",
    "Orumba North",
    "Orumba South",
    "Oyi",
  ],
  Enugu: [
    "Aninri",
    "Awgu",
    "Enugu East",
    "Enugu North",
    "Enugu South",
    "Ezeagu",
    "Igbo Etiti",
    "Igbo Eze North",
    "Igbo Eze South",
    "Isi Uzo",
    "Nkanu East",
    "Nkanu West",
    "Nsukka",
    "Oji River",
    "Udenu",
    "Udi",
    "Uzo Uwani",
  ],

  Imo: [
    "Aboh Mbaise",
    "Ahiazu Mbaise",
    "Ehime Mbano",
    "Ezinihitte",
    "Ideato North",
    "Ideato South",
    "Ihitte/Uboma",
    "Ikeduru",
    "Isiala Mbano",
    "Isu",
    "Mbaitoli",
    "Ngor Okpala",
    "Njaba",
    "Nkwerre",
    "Nwangele",
    "Obowo",
    "Oguta",
    "Ohaji/Egbema",
    "Okigwe",
    "Orlu",
    "Orsu",
    "Oru East",
    "Oru West",
    "Owerri Municipal",
    "Owerri North",
    "Owerri West",
    "Unuimo",
  ],

  Delta: [
    "Aniocha North",
    "Aniocha South",
    "Bomadi",
    "Burutu",
    "Ethiope East",
    "Ethiope West",
    "Ika North East",
    "Ika South",
    "Isoko North",
    "Isoko South",
    "Ndokwa East",
    "Ndokwa West",
    "Okpe",
    "Oshimili North",
    "Oshimili South",
    "Patani",
    "Sapele",
    "Udu",
    "Ughelli North",
    "Ughelli South",
    "Ukwuani",
    "Uvwie",
    "Warri North",
    "Warri South",
    "Warri South West",
  ],

  Lagos: [
    "Agege",
    "Ajeromi-Ifelodun",
    "Alimosho",
    "Amuwo-Odofin",
    "Apapa",
    "Badagry",
    "Epe",
    "Eti-Osa",
    "Ibeju-Lekki",
    "Ifako-Ijaiye",
    "Ikeja",
    "Ikorodu",
    "Kosofe",
    "Lagos Island",
    "Lagos Mainland",
    "Mushin",
    "Ojo",
    "Oshodi-Isolo",
    "Shomolu",
    "Surulere",
  ],

  FCT: ["Abaji", "Abuja Municipal", "Bwari", "Gwagwalada", "Kuje", "Kwali"],
};

const tabs = document.querySelectorAll(".tabs button");

function showForm(formId) {
  document.querySelectorAll(".form-section").forEach((section) => {
    section.classList.remove("active");
  });

  document.getElementById(formId).classList.add("active");

  tabs.forEach((btn) => {
    btn.classList.remove("active");
  });

  event.target.classList.add("active");
}

/* LOGIN PASSWORD VALIDATION */
document.getElementById("loginForm").addEventListener("submit", function (e) {
  const password = document.getElementById("loginPassword").value;

  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (!regex.test(password)) {
    e.preventDefault();

    document.getElementById("passwordError").textContent =
      "Password must be at least 8 characters with 1 uppercase letter and 1 special character.";
  }
});

/* PASSPORT PREVIEW + SIZE VALIDATION */
const passport = document.getElementById("passport");

passport.addEventListener("change", function () {
  const file = this.files[0];

  if (!file) return;

  const maxSize = 500 * 1024;

  if (file.size > maxSize) {
    document.getElementById("fileError").textContent =
      "File must not exceed 500KB.";

    this.value = "";

    document.getElementById("previewImage").style.display = "none";

    return;
  }

  document.getElementById("fileError").textContent = "";

  const reader = new FileReader();

  reader.onload = function (e) {
    const preview = document.getElementById("previewImage");

    preview.src = e.target.result;
    preview.style.display = "block";
  };

  reader.readAsDataURL(file);
});

/* REGISTRATION SUBMIT */
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    if (!this.checkValidity()) {
      e.preventDefault();
      alert("All fields are required.");
    }
  });

// STATE AND LOCAL GOVERNMENT
const stateSelect = document.getElementById("state");
const lgaSelect = document.getElementById("lga");

Object.keys(statesAndLGAs).forEach((state) => {
  const option = document.createElement("option");
  option.value = state;
  option.textContent = state;
  stateSelect.appendChild(option);
});
stateSelect.addEventListener("change", function () {
  const selectedState = this.value;

  lgaSelect.innerHTML = '<option value="">Select LGA</option>';

  if (!selectedState) return;

  statesAndLGAs[selectedState].forEach((lga) => {
    const option = document.createElement("option");
    option.value = lga;
    option.textContent = lga;
    lgaSelect.appendChild(option);
  });
});
