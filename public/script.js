`use strict`;

window.addEventListener("DOMContentLoaded", function (e) {
  const root = document.getElementById("root");
  const message = root.querySelector(`.message`);

  const inputText = root.querySelector(".input");

  inputText.addEventListener(`change`, function (event) {
    const student = event.target.value;
    postData({ newStudent: student });
  });

  async function postData(data) {
    const url = `http://localhost:3000/api/students`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .catch((err) => console.error(err));

    message.innerHTML = response.msg;
    RemoveMessage();
  }

  function RemoveMessage() {
    setTimeout(() => (message.innerHTML = ""), 1100);
  }
});
