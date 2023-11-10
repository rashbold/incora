import express from "express";
import cors from "cors";
import users from "./users.json";
import feeds from "./data/feeds.json";
import fs from "fs";

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
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(401);
  }
});

app.get("/api/feeds/users/:userId", (req, res) => {
  const { userId } = req.params;
  const userFeeds = feeds.filter(
    (feed: any) => feed.user_id === parseInt(userId)
  );
  res.json(userFeeds);
});

app.post("/api/feeds/users", (req, res) => {
  const { userId, url } = req.body;
  const newFeed = {
    id: feeds.length + 1,
    user_id: parseInt(userId),
    url,
  };
  feeds.push(newFeed);
  fs.writeFileSync("./data/feeds.json", JSON.stringify(feeds));
  res.json(newFeed);
});

app.delete("/api/feeds/:feedId", (req, res) => {
  const { feedId } = req.params;
  const index = feeds.findIndex((feed: any) => feed.id === parseInt(feedId));
  if (index !== -1) {
    feeds.splice(index, 1);
    fs.writeFileSync("./data/feeds.json", JSON.stringify(feeds));
    res.sendStatus(204);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
