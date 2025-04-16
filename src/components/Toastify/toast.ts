import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

type ToastType = "success" | "error" | "info";

export function showToast(message: string, type: ToastType = "info"): void {
  const backgroundColors = {
    success: "#4CAF50",
    error: "#FF5252",
    info: "#2196F3",
  };

  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "center",
    backgroundColor: backgroundColors[type],
    stopOnFocus: true,
  }).showToast();
}
//npm install toastify-js
//npm install --save-dev @types/toastify-js

//showToast("Usuário cadastrado com sucesso!", "success");
