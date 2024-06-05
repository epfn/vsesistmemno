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

function maskInput() {
  const phone = document.querySelectorAll('[name="phone"]');
  if (phone) {
    phone.forEach((element) => {
      const maskOptions = {
        mask: "+{7} (000) 000-00-00",
      };
      const mask = IMask(element, maskOptions);
    });
  }

  const dateInputs = document.querySelectorAll(".input__element--date");
  if (dateInputs.length) {
    dateInputs.forEach((element) => {
      const maskOptions = {
        mask: Date,
      };
      const mask = IMask(element, maskOptions);
    });
  }
}

maskInput();

function menuToggle() {
  const button = document.querySelector(".header__menu");
  const wrapper = document.querySelector(".header__wrapper");

  if (button && wrapper) {
    button.addEventListener("click", () => {
      if (button.classList.contains("header__menu--open")) {
        document.body.classList.remove("body-overflow");
        button.classList.remove("header__menu--open");
        button.classList.remove("icon-close");
        button.classList.add("icon-menu");
        wrapper.classList.remove("header__wrapper--open");
      } else {
        document.body.classList.add("body-overflow");
        wrapper.classList.add("header__wrapper--open");
        button.classList.add("header__menu--open");
        button.classList.add("icon-close");
        button.classList.remove("icon-menu");
      }
    });
  }
}

menuToggle();

function customSelects() {
  const selects = document.querySelectorAll(".select");
  if (selects.length) {
    selects.forEach((select) => {
      const choices = new Choices(select, {
        searchEnabled: false,
        itemSelectText: "",
      });
    });
  }
}

customSelects();

function storageMasonry() {
  if (document.querySelector(".storage__list")) {
    const masonry = new MiniMasonry({
      container: ".storage__content",
      baseWidth: 312,
      gutter: 20,
      surroundingGutter: false,
      minify: false,
      ultimateGutter: 15,
    });
  }
}

storageMasonry();

if (document.querySelector(".hero__accordion")) {
  new Accordion(".hero__accordion", {
    openOnInit: [2],
    collapse: false,
  });
}
