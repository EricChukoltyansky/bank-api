const fs = require("fs");

const loadUsers = (id = undefined) => {
  // console.log("id", id);
  const dataBuffer = fs.readFileSync("./db/users.json");
  const dataJSON = dataBuffer.toString();
  const users = JSON.parse(dataJSON);
  if (!id) {
    return users;
  } else {
    const result = users.find((user) => {
      return user.id === +id;
    });
    if (!result) {
      throw Error(`No such user with that id: ${id} `);
    }
    return result;
  }
};

const addUser = (body) => {
  console.log("body", body);
  try {
    const users = loadUsers();
    users.find((user) => {
      if (user.id === body.id) {
        throw Error("The user already exist");
      }
    });
    obj = {
      id: "id" + Math.random().toString(16).slice(2) || 0,
      credit: body.credit || 0,
      cash: body.cash || 0,
    };
    users.push(validateInputs(obj));
    saveUsers(users);
    return stringToJson("new-client", body);
  } catch (e) {
    return e.message;
  }
};
const stringToJson = (message, string, message2, string2) => {
  return JSON.stringify({ [message]: string, [message2]: string2 });
};

const depositCash = (id, newAmount) => {
  try {
    const user = loadUsers(id);
    console.log("user", user);
    console.log(newAmount);

    const users = loadUsers();
    // console.log(user);
    const sumCash = user.cash + newAmount.cash;
    console.log("sumCash", sumCash);
    const updatedUser = users.map((account) => {
      if (account.id === +id) {
        return validateInputs({
          id: Number(account.id),
          cash: Number(sumCash),
          credit: account.credit,
        });
      }
      return account;
    });
    console.log("updatedUser", updatedUser);
    saveUsers(updatedUser);
    return loadUsers();
  } catch (e) {
    return e.message;
  }
};

const updateCredit = (id, newAmount) => {
  try {
    const user = loadUsers(id);

    console.log("newAmount", newAmount);
    const users = loadUsers();

    const updatedUser = users.map((account) => {
      if (account.id === +id) {
        return validateInputs({
          id: Number(account.id),
          cash: Number(account.cash),
          credit: newAmount.credit,
        });
      }
      return account;
    });
    console.log("updatedUser", updatedUser);
    saveUsers(updatedUser);
    return loadUsers();
  } catch (e) {
    return e.message;
  }
};

const withdraw = (id, withdrawAmount) => {
  try {
    const user = loadUsers(id);
    console.log("user", user);
    const users = loadUsers();
    console.log("users", users);
    const updatedUser = users.map((account) => {
      if (account.id === +id) {
        return withdrawValid(user, withdrawAmount);
      }
      return account;
    });
    console.log("updatedUser", updatedUser);
    saveUsers(updatedUser);
    return updatedUser;
  } catch (e) {
    return e.message;
  }
};

const withdrawValid = ({ id, cash, credit }, { withdraw }) => {
  if (cash + credit < withdraw) {
    throw new Error("There is non sufficient funds");
  }

  let tempCash = cash;

  if (cash > 0) {
    tempCash -= withdraw;
  }

  if (cash === 0 && credit > 0) {
    credit -= withdraw;
  }
  cash = tempCash;
  return { id, credit, cash };
};

const transfer = (id1, id2, transferAmount) => {
  try {
    const user1 = loadUsers(id1);
    console.log(user1);
    const user2 = loadUsers(id2);
    console.log(user2);
    console.log(transferAmount);
    const users = loadUsers();
    const updatedData = users.map((account) => {
      if (account.id === +id1) {
        return withdrawValid(user1, transferAmount);
      }
      if (account.id === +id2) {
        console.log("account cash", account.cash);
        console.log("transfer Amount", transferAmount.withdraw);
        return {
          id: account.id,
          cash: Number(account.cash) + Number(transferAmount.withdraw),
          credit: account.credit,
        };
      }
      return account;
    });

    saveUsers(updatedData);

    return loadUsers();
  } catch (e) {
    return e.message;
  }
};

const validateInputs = (body) => {
  if (
    typeof body.credit !== "number" ||
    typeof body.cash !== "number" ||
    typeof body.id !== "number"
  ) {
    throw new Error("Please enter a valid number");
  }
  if (body.credit < 0) {
    throw new Error("Please enter a positive value");
  }
  return body;
};

const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync("./db/users.json", dataJSON);
};

module.exports = {
  loadUsers,
  addUser,
  depositCash,
  updateCredit,
  withdraw,
  transfer,
};
