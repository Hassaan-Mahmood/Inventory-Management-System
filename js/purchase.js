import { productValidation } from "./validation.js";
import supabase from "./credential.js";
// Sidebar navigation is in common.js

// ================= Get elements =================
const purchaseProduct = document.getElementById("purchaseProduct");
const purchaseQty = document.getElementById("purchaseQty");
const purchasePrice = document.getElementById("purchasePrice");
const purchaseTotal = document.getElementById("purchaseTotal");
const purchaseClearBtn = document.getElementById("purchaseClearBtn");
const purchaseSaveBtn = document.getElementById("purchaseSaveBtn");
const purchaseTableBody = document.getElementById("purchaseTableBody");

const allPurchases = async () => {
  try {
    const { data, error } = await supabase.from("purchases").select();
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
    purchaseTableBody.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      purchaseTableBody.innerHTML += `
      <tr>
        <td>${element.product_name}</td>
        <td>${element.quantity}</td>
        <td>${element.price}</td>
        <td>${element.price * element.quantity}</td>
        <td></td>
      </tr>
      `;
      console.log(element);
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

// ================= Total =================
const totalPrice = () => {
  return purchaseQty.value * purchasePrice.value;
};

purchasePrice.oninput = () => {
  purchaseTotal.value = totalPrice();
};

purchaseQty.oninput = () => {
  purchaseTotal.value = totalPrice();
};

// ================= Reset =================
// har field ki value khali, total 0
const resetForm = () => {
  purchaseProduct.value = "";
  purchaseQty.value = "";
  purchasePrice.value = "";
  purchaseTotal.value = 0;
};

purchaseClearBtn.onclick = resetForm;

// ================= Save purchase =================
purchaseSaveBtn.onclick = async () => {
  // click hote hi button ka text badlo aur disable kar do
  purchaseSaveBtn.innerHTML = "Saving...";
  purchaseSaveBtn.disabled = true;

  const validateForm = productValidation(
    purchaseProduct.value,
    purchaseQty.value,
    purchasePrice.value,
  );

  // validation false hui to button wapis theek karo aur yahin ruk jao
  if (validateForm === false) {
    purchaseSaveBtn.innerHTML = "Save purchase";
    purchaseSaveBtn.disabled = false;
    return;
  }

  const purchase = {
    product_name: purchaseProduct.value,
    quantity: Number(purchaseQty.value),
    price: Number(purchasePrice.value),
  };

  try {
    const { error } = await supabase.from("purchases").insert(purchase);
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Purchase has been added to your stock",
      });
      resetForm();
      allPurchases();
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }

  // function ke akhir me button wapis theek
  purchaseSaveBtn.innerHTML = "Save purchase";
  purchaseSaveBtn.disabled = false;
};

allPurchases();
