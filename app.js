const express = require("express");
const app = express();

app.use(express.json());

const users = [];

app.get("/", (request, response) => {
  if (users.length == 0) {
    response.status(404).send("No Users Found!");
    return;
  }
  response.status(200).send(users);
});

app.post("/users", (request, response) => {
  const user = request.body;
  const findUser = users.find((User) => {
    User.id === user.id;
  });
  if (findUser) {
    response.status(404).send("Users Already Exsists!");
    return;
  }
  users.push(user);
  response.status(200).send("Created!");
});

app.post("/users/:id", (request, response) => {
  const { id } = request.params;
  const findUserIndex = users.findIndex((User) => {
    User.id === id;
  });
  if (findUserIndex == -1) {
    response.status(404).send("Users Not Found!");
    return;
  }
  users.splice(findUserIndex, 1);
  response.status(200).send("User Deleted Successfully!");
});

const port = 8000;

app.listen(port, () => {
  console.log("Started on port 8000");
});
