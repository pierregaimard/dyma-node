const contentElem = document.querySelector('textarea[name="content"]');
const counterElem = document.querySelector(".content-length-count");

const refreshCounter = () => {
  const length = contentElem.value.length;

  length < 3 || length > 140
    ? counterElem.classList.add("text-danger")
    : counterElem.classList.remove("text-danger");
  counterElem.innerText = `${length} ${
    length === 1 ? "caractère" : "caractères"
  }`;
};

contentElem.addEventListener("input", () => {
  refreshCounter();
});

refreshCounter();
