const express = require("express");
const app = express();

const {
  loadUsers,
  addUser,
  depositCash,
  updateCredit,
  withdraw,
  transfer,
  filterUsers,
} = require("./utils");
app.use(express.json());

//
app.get("/users/", (req, res) => {
  try {
    if (req.query.sorted) {
      const data = filterUsers();
      res.status(200).send(data);
    } else {
      res.status(200).send(loadUsers());
    }
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

app.post("/users/", (req, res) => {
  try {
    res.status(201).send(addUser(req.body));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post("/deposit/:id", (req, res) => {
  try {
    res.status(201).send(depositCash(req.params.id, req.body));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post("/withdraw/:id/", (req, res) => {
  try {
    res.status(201).send(withdraw(req.params.id, req.body));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post("/update/:id/", (req, res) => {
  try {
    res.status(201).send(updateCredit(req.params.id, req.body));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post("/transfer/:senderId/:recieverId", (req, res) => {
  try {
    res
      .status(201)
      .send(transfer(req.params.senderId, req.params.recieverId, req.body));
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
