const datepicker = new AirDatepicker(".input__element--date", {});

function passwordToggle() {
  const passwordElement = document.querySelector(".input__element--password");

  if (passwordElement) {
    const iconElement = passwordElement.nextElementSibling;

    iconElement.addEventListener("click", () => {
      if (iconElement.classList.contains("icon-eye")) {
        iconElement.classList.remove("icon-eye");
        iconElement.classList.add("icon-eye-off");
        passwordElement.type = "text";
      } else {
        iconElement.classList.add("icon-eye");
        iconElement.classList.remove("icon-eye-off");
        passwordElement.type = "password";
      }
    });
  }
}

passwordToggle();
