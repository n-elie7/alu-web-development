let fileCounter = 1;

const regexPatterns = {
  name: /^[a-zA-Z\s]{2,}$/,
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\d{10,15}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
  country: /^[a-zA-Z\s]{2,}$/,
  city: /^[a-zA-Z\s]{2,}$/,
  postalCode: /^[a-zA-Z0-9\s-]{3,10}$/,
};

const form = document.getElementById("registrationForm");
const inputs = form.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("blur", () => validateField(input));
  input.addEventListener("input", () => {
    if (input.classList.contains("error")) {
      validateField(input);
    }
  });
});

function validateField(input) {
  const fieldName = input.name;
  const value = input.value.trim();
  const errorElement = document.getElementById(`${fieldName}Error`);

  if (!value) {
    input.classList.remove("valid");
    input.classList.add("error");
    errorElement.classList.add("show");
    errorElement.textContent = "This field is required";
    return false;
  }

  const isValid = regexPatterns[fieldName].test(value);

  if (isValid) {
    input.classList.remove("error");
    input.classList.add("valid");
    errorElement.classList.remove("show");
    return true;
  } else {
    input.classList.remove("valid");
    input.classList.add("error");
    errorElement.classList.add("show");
    return false;
  }
}

function validateForm() {
  let isValid = true;
  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  return isValid;
}

function downloadJSON(data, filename) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    password: document.getElementById("password").value,
    address: {
      country: document.getElementById("country").value.trim(),
      city: document.getElementById("city").value.trim(),
      postalCode: document.getElementById("postalCode").value.trim(),
    },
  };

  const filename = String(fileCounter).padStart(3, "0") + ".json";
  downloadJSON(formData, filename);

  const successMessage = document.getElementById("successMessage");
  successMessage.textContent = `Success! File ${filename} has been created.`;
  successMessage.classList.add("show");

  fileCounter++;

  form.reset();
  inputs.forEach((input) => {
    input.classList.remove("valid", "error");
  });

  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 5000);
});
