const express = require("express");
const morgan = require("morgan");
const { MongoClient } = require("mongodb");

const DB_URI = "mongodb://localhost:27017";

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json({ response: "Blogex Backend" });
});

app.get("/api/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const client = await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("blogex");
    const articleInfo = await db.collection("articles").findOne({ name: name });
    res.status(200).json(articleInfo);

    client.close();
  } catch (err) {
    res.status(500).json({ message: "Error connecting to the database", err });
  }
});

app.post("/api/:name/upvote", (req, res) => {
  const name = req.params.name;
  articles[name].upvotes += 1;
  res.status(200).json({
    response: `${name} now has ${articles[name].upvotes} upvotes`,
  });
});

app.post("/api/:name/add-comment", (req, res) => {
  const name = req.params.name;
  const { user, comment } = req.body;
  articles[name].comments.push({ user, comment });
  res.status(200).json(articles[name]);
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
