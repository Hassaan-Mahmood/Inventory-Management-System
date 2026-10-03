import { validation } from "./validation.js";

// ================= Get elements =================
const signupForm = document.getElementById("signupForm");
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPhone = document.getElementById("signupPhone");
const signupPassword = document.getElementById("signupPassword");
const signupConfirm = document.getElementById("signupConfirm");
const signupBtn = document.getElementById("signupBtn");
const goToLogin = document.getElementById("goToLogin");

// ================= Signup =================
signupBtn.onclick = () => {
  const validateForm = validation(
    signupName.value,
    signupEmail.value,
    signupPassword.value,
    signupConfirm.value
  );

  // validation false hui to yahin ruk jao
  if (validateForm === false) {
    return;
  }

  window.location.href = "login.html";
};

// ================= Navigation =================
goToLogin.onclick = (e) => {
  e.preventDefault();
  window.location.href = "login.html";
};
