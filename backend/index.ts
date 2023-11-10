import express from "express";
import cors from "cors";
import users from "./users.json";

const app = express();
const port = 3900;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
  express.json()
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/login", (req, res) => {
  const { name, password } = req.body;
  const user = users.find(
    (user: any) => user.name === name && user.password === password
  );
  console.log(user, req.body);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(401);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
