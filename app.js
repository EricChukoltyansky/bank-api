const express = require("express");
const app = express();

const { loadUsers, addUser } = require("./utils");
app.use(express.json());

//
app.get("/users", (req, res) => {
  try {
    res.status(200).send(loadUsers());
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.get("/users/:id", (req, res) => {
  try {
    res.status(200).send(loadUsers(req.params.id));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// app.put("/users/withdraw/:id", (req, res) => {});

// app.put("/users/deposit/:id", (req, res) => {});

// app.put("/users/transfer/:id", (req, res) => {});

app.put("/users/:id", (res, req) => {
  //withdraw
  // deposit
  // update credit
  // transfer
});

app.post("/users/", (req, res) => {
  try {
    res.status(201).send(addUser(req.body));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.delete("/users/:id", (req, res) => {});
//

const PORT = 3000;
const host = "localhost";

app.listen(PORT, host, () => {
  console.log(`Listening on port: http://${host}:${PORT}`);
});
