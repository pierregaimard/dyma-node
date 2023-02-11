const formElem = document.querySelector(".profile-container form");
const inputElem = document.querySelector(
  '.profile-container input[name="avatar"]'
);
const imgElem = document.querySelector(".profile-container .profile-img");

imgElem.addEventListener("click", () => {
  inputElem.click();
});

inputElem.addEventListener("change", () => {
  formElem.submit();
});
