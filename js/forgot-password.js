import { validation } from "./validation.js";

// ================= Get elements =================
const forgotForm = document.getElementById("forgotForm");
const forgotEmail = document.getElementById("forgotEmail");
const sendCodeBtn = document.getElementById("sendCodeBtn");
const goToLogin = document.getElementById("goToLogin");

// ================= Send code =================
sendCodeBtn.onclick = () => {
  const validateForm = validation(false, forgotEmail.value, false, false);

  // validation false hui to yahin ruk jao
  if (validateForm === false) {
    return;
  }

  window.location.href = "reset-password.html";
};

// ================= Navigation =================
goToLogin.onclick = (e) => {
  e.preventDefault();
  window.location.href = "login.html";
};
