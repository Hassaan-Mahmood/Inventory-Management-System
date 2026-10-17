import { productValidation } from "./validation.js";
import supabase from "./credential.js";

// ================= Get elements =================
const sellCustomer = document.getElementById("sellCustomer");
const sellProduct = document.getElementById("sellProduct");
const sellQty = document.getElementById("sellQty");
const sellPrice = document.getElementById("sellPrice");
const sellClearBtn = document.getElementById("sellClearBtn");
const sellSaveBtn = document.getElementById("sellSaveBtn");

const resetForm = () => {
  sellCustomer.value = "";
  sellProduct.value = "";
  sellQty.value = "";
};

const getAllPurchases = async () => {
  try {
    const { data, error } = await supabase.from("purchases").select();
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } else {
      sellProduct.innerHTML += ``;
      sellProduct.innerHTML += `
      <option value="">Select product</option>
      `;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        sellProduct.innerHTML += `
        <option value=${element.id}>${element.product_name} ( ${element.available_quantity} )</option>
        `;
      }
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }
};

sellClearBtn.onclick = resetForm;

// ================= Save sale =================
sellSaveBtn.onclick = async () => {
  sellSaveBtn.innerHTML = "Saving...";
  sellSaveBtn.disabled = true;

  const validateProduct = productValidation(
    sellProduct.value,
    sellQty.value,
    sellPrice.value,
  );

  if (validateProduct === false) {
    sellSaveBtn.innerHTML = "Save sale";
    sellSaveBtn.disabled = false;
    return;
  }

  const sale = {
    customer_name: sellCustomer.value,
    purchase_id: Number(sellProduct.value),
    quantity: Number(sellQty.value),
    price: Number(sellPrice.value),
  };

  console.log("sale", sale);

  try {
    const { error } = await supabase.from("sales").insert(sale);
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } else {
      const { error } = await supabase
        .from("purchases")
        .update({ available_quantity: initial_Quantity - sellQty.value })
        .eq("id", sale.purchase_id);
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Sale has been created",
      });
      resetForm();
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  }

  // function ke akhir me button wapis theek
  sellSaveBtn.innerHTML = "Save sale";
  sellSaveBtn.disabled = false;
};

getAllPurchases();