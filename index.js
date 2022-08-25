const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = 3000;
const bodyParser = require("body-parser");

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + `/public`));

//Default page return
app.get("/", (req, res) => res.sendFile(path.join(__dirname, `/public/index.html`)));

app.get("/api/status/active", async (req, res) => {
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
  const indexPage = __dirname + "/public/index.html";
  res.sendFile(indexPage);
});

app.post("/api/students", (req, res) => {
  const dat = req.body;
  let allStudentList = null;

  fs.readFile(__dirname + `/data/students.json`, `utf8`, (err, data) => {
    if (err) throw err;
    allStudentList = JSON.parse(data);
    const newStudent = { id: allStudentList[allStudentList.length - 1].id + 1, name: dat.newStudent, status: true };
    allStudentList.push(newStudent);

    const option = { encoding: "utf8", flag: "w" }; //Optionally
    fs.writeFile(__dirname + `/data/students.json`, JSON.stringify(allStudentList), option, (err) => {
      if (err) throw err;
    });
    res.send({ success: true, msg: "student loaded successfully" });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
