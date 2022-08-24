const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;

app.post("/", (req, res) => {}); //TODO

app.get("/api/status/active", (req, res) => {
  const file = __dirname + "/data/students.json";
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    resData = JSON.parse(data);
    result = resData.filter((dat) => dat.status === true);
    res.send(result);
  });
});

app.get("/api/status/finished", (req, res) => {
  const file = __dirname + "/data/students.json";
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    resData = JSON.parse(data);
    result = resData.filter((dat) => dat.status === false);
    res.send(result);
  });
});

app.get("/students/:id", (req, res) => {
  if (req.params.id) {
    const file = __dirname + "/data/students.json";
    let resData = null;
    fs.readFile(file, async (err, data) => {
      if (err) throw err;
      resData = await JSON.parse(data);
      result = resData.find((data) => data.id === Number.parseInt(req.params.id));

      res.send(result);
    });
    //const sendpackage = data.forEach((user) => user.id === req.params.id);
  }
});

app.get("/students/", async (req, res) => {
  const file = __dirname + "/data/students.json";
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    res.setHeader("content-type", "application/json");
    res.send(data);
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World! It's Codecool</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
