const datepickers = document.querySelectorAll(".input__element--date");

if (datepickers.length) {
  datepickers.forEach((datepicker) => {
    const currentDate = datepicker.getAttribute("value");
    let selected = undefined;

    if (currentDate) {
      const date = currentDate.split(".");
      selected = new Date(+date[2], +date[1] - 1, +date[0]);
    }

    const picker = new AirDatepicker(datepicker, {
      selectedDates: [selected],
      dateFormat(date) {
        return date.toLocaleString("ru", {
          year: "numeric",
          day: "2-digit",
          month: "2-digit",
        });
      },
    });

    datepicker.addEventListener("change", (e) => {
      const date = e.target.value.split(".");
      picker.selectDate(new Date(+date[2], +date[1] - 1, +date[0]));
    });
  });
}

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

const menuLinks = document.querySelectorAll(".menu__link");

if (menuLinks.length) {
  const button = document.querySelector(".header__menu");
  const wrapper = document.querySelector(".header__wrapper");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("body-overflow");
      button.classList.remove("header__menu--open");
      button.classList.remove("icon-close");
      button.classList.add("icon-menu");
      wrapper.classList.remove("header__wrapper--open");
    });
  });
}

const selectCopy = [];

function customSelects() {
  const selects = document.querySelectorAll(".select");
  if (selects.length) {
    selects.forEach((select) => {
      if (select.parentElement.classList.contains("fieldset__row--copy")) {
        const copy = select.cloneNode(true);
        selectCopy.push(copy);
      }

      const choice = new Choices(select, {
        searchEnabled: false,
        itemSelectText: "",
        allowHTML: false,
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
    duration: 380,
  });
}

const portalAccordion = document.querySelector(".portal__accordion");

if (portalAccordion) {
  let w = 0;
  new Accordion(portalAccordion, {
    openOnInit: [0],
    collapse: false,
    duration: 380,
    beforeOpen: () => {
      const content = portalAccordion.querySelectorAll(".ac-content");
      content.forEach((con) => {
        w = Math.max(w, con.clientHeight);
      });
      content.forEach((con) => {
        con.style.minHeight = w + "px";
      });
    },
  });
}

if (document.querySelector(".accordion")) {
  new Accordion(".accordion", {
    collapse: true,
    showMultiple: true,
    duration: 380,
    triggerClass: "headline__title",
  });
}

const tabs = document.querySelectorAll(".tab");

if (tabs.length) tabs.forEach((tab) => tabLogic(tab));

function tabLogic(tab) {
  const triggers = tab.querySelectorAll(".tab__item");
  const contents = tab.querySelectorAll(".tab__content");
  const tabList = document.querySelector(".tab__list");
  const tabContainer = document.querySelector(".tab__container");

  const open = tab.getAttribute("data-open") || 1;

  triggers.forEach((trigger, index) => {
    trigger.setAttribute("data-tab", index + 1);
    if (+open === index + 1) {
      trigger.classList.add("tab__item--active");
    }
  });

  contents.forEach((content, index) => {
    content.setAttribute("data-tab", index + 1);
    if (+open === index + 1) {
      content.classList.add("tab__content--active");
      content.classList.add("tab__content--opacity");
    }
  });

  const clickHandler = (event) => {
    triggers.forEach((t) => {
      t.classList.remove("tab__item--active");
    });

    contents.forEach((c) => {
      c.classList.remove("tab__content--active");
      c.classList.remove("tab__content--opacity");
    });

    const index = event.target.getAttribute("data-tab");

    const selectedTrigger = tabList.querySelector(`[data-tab="${index}"]`);
    selectedTrigger.classList.add("tab__item--active");

    const selectedContent = tabContainer.querySelector(`[data-tab="${index}"]`);
    selectedContent.classList.add("tab__content--active");

    setTimeout(() => {
      selectedContent.classList.add("tab__content--opacity");
    }, 200);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", clickHandler);
  });
}

function addTag() {
  const trigger = document.querySelector(".fieldset__add--tag");

  if (trigger) {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const fieldset = trigger.parentElement;
      const row = fieldset.querySelector(".fieldset__row");
      const n = window.innerWidth > 992 ? 4 : window.innerWidth > 576 ? 2 : 1;
      for (let i = 0; i < n; i++) {
        const newInput = fieldset.querySelector(".input").cloneNode(true);
        newInput.querySelector("input").value = "";
        row.appendChild(newInput, trigger);
      }
    });
  }
}

addTag();

function addChoices() {
  const trigger = document.querySelector(".fieldset__add--choices");

  if (trigger) {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      const fieldset = trigger.parentElement;
      const row = fieldset.querySelector(".fieldset__row");

      selectCopy.forEach((copy) => {
        row.appendChild(copy.cloneNode(true));
        const choice = new Choices(row.lastElementChild, {
          searchEnabled: false,
          itemSelectText: "",
          allowHTML: false,
        });
      });
    });
  }
}

addChoices();

function initTinyMCE(params) {
  tinymce.init({
    selector: ".tinymce",
    language: "ru",
    theme: "silver",
    skin: "oxide",
    promotion: false,
    license_key: "gpl",
    height: 380,
    resize: true,
    branding: false,
    elementpath: false,
    min_height: 380,
  });
}

initTinyMCE();

// const form = document.querySelector(".surface");

// if (form) {
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     formData = new FormData(form);
//     for (let [key, value] of formData) {
//       console.log(`${key} — ${value}`);
//     }
//   });
// }
