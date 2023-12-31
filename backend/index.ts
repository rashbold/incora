import express from "express";
import cors from "cors";
import users from "./data/users.json";
import feeds from "./data/feeds.json";
import Parser from "rss-parser";
import fs from "fs";

let parser = new Parser();

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

app.get("/api/feeds/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const userFeeds = feeds.filter(
    (feed: any) => feed.user_id === parseInt(userId)
  );

  const feedsToReturn: any[] = [];
  for (const feed of userFeeds) {
    const parsed = await parser.parseURL(feed.url);
    parsed.id = feed.id;
    feedsToReturn.push(parsed);
  }

  res.json(
    feedsToReturn.map((feed: any) => {
      return {
        id: feed.id,
        title: feed.title,
        date: feed.lastBuildDate,
      };
    })
  );
});

app.get("/api/feeds/:feedId", async (req, res) => {
  const { feedId } = req.params;
  const feed = feeds.find((feed) => feed.id === parseInt(feedId));
  if (feed) {
    try {
      const parsed = await parser.parseURL(feed.url);
      const items = parsed.items;
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.sendStatus(404);
  }
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
