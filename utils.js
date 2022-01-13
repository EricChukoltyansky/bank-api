const fs = require("fs");

const loadUsers = (id = undefined) => {
  try {
    console.log("id", id);
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
  } catch (e) {
    return e ? e.message : [];
  }
};

const addUser = (body) => {
  //   console.log(body);
  try {
    const users = loadUsers();
    users.find((user) => {
      if (user.id === body.id) {
        throw Error("The user already exist");
      }
    });
    users.push(validateInputs(body));
    saveUsers(users);
    return stringToJson("new-client", body);
  } catch (e) {
    return e.message;
  }
};
const stringToJson = (message, string, message2, string2) => {
  return JSON.stringify({ [message]: string, [message2]: string2 });
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
};
