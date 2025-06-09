const btnSubmit = document.getElementById("submitBtn");
const title = document.getElementById("create-thread-title");
const content = document.getElementById("create-thread-content");
const image = document.getElementById("create-thread-images");

async function postData() {}

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(title.value, content.value, image.value);
  postData();
});
