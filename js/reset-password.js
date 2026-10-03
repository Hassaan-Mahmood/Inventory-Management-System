import { validation } from "./validation.js";

// ================= Get elements =================
const resetForm = document.getElementById("resetForm");
const resetCode = document.getElementById("resetCode");
const newPassword = document.getElementById("newPassword");
const confirmNewPassword = document.getElementById("confirmNewPassword");
const resetBtn = document.getElementById("resetBtn");
const goToLogin = document.getElementById("goToLogin");

// ================= Reset password =================
resetBtn.onclick = () => {
  const validateForm = validation(false, false, newPassword.value, confirmNewPassword.value);

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
