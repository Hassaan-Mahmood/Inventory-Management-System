import { validation } from "./validation.js";

// ================= Get elements =================
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const rememberMe = document.getElementById("rememberMe");
const loginBtn = document.getElementById("loginBtn");
const goToSignup = document.getElementById("goToSignup");
const goToForgot = document.getElementById("goToForgot");

// ================= Login =================
loginBtn.onclick = () => {
  const validateForm = validation(false, loginEmail.value, loginPassword.value, false);

  // validation false hui to yahin ruk jao
  if (validateForm === false) {
    return;
  }

  window.location.href = "dashboard.html";
};

// ================= Navigation =================
goToSignup.onclick = (e) => {
  e.preventDefault();
  window.location.href = "signup.html";
};

goToForgot.onclick = (e) => {
  e.preventDefault();
  window.location.href = "forgot-password.html";
};
