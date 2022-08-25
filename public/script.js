`use strict`;

const root = document.getElementById("root");

const inputText = root.querySelector(".input");

inputText.addEventListener(`change`, function (event) {
  const student = event.target.value;
  postData({ newStudent: student });
});

async function postData(data) {
  const url = `http://localhost:3000/api/students`;

  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => response.json)
    .then((result) => console.log(result))
    .catch((err) => console.error(err));
}
