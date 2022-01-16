const express = require("express");
const app = express();
const hbs = require("hbs");

// app.set("view engine", "hbs");
// const path = require("path");
// app.use(express.static(path.join(__dirname, "/public")));

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
app.get("/users", async (req, res) => {
  try {
    if (req.params.sorted) {
      res.status.send(filterUsers());
    } else {
      res.status(200).send(await loadUsers());
    }
  } catch (e) {
    res.status(400).send({ error: e.message }); //"Unspecified error" });
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

// const PORT = 3000; BEFORE HEROKU
const PORT = process.env.PORT || 3000
// const host = "localhost";


app.listen(PORT,() => {
  console.log(`Listening on port: ${PORT}`);
});
