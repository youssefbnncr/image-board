const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu > ul");

burger.addEventListener("click", (e) => {
  if (menu.style.display == "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
});
