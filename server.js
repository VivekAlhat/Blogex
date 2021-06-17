const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const { MongoClient } = require("mongodb");

const DB_URI = "mongodb://localhost:27017";

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8000;

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db("blogex");
    await operations(db);
    client.close();
  } catch (err) {
    res.status(500).json({ message: "Error connecting to the database", err });
  }
};

app.get("/", (req, res) => {
  res.json({ response: "Blogex Backend" });
});

app.get("/api/:name", async (req, res) => {
  withDB(async (db) => {
    const name = req.params.name;
    const articleInfo = await db.collection("articles").findOne({ name: name });
    res.status(200).json(articleInfo);
  }, res);
});

app.post("/api/:name/upvote", async (req, res) => {
  withDB(async (db) => {
    const name = req.params.name;
    const articleInfo = await db.collection("articles").findOne({ name: name });
    await db
      .collection("articles")
      .updateOne(
        { name: name },
        { $set: { upvotes: articleInfo.upvotes + 1 } }
      );

    const updatedArticle = await db
      .collection("articles")
      .findOne({ name: name });

    res.status(200).json(updatedArticle);
  }, res);
});

app.post("/api/:name/add-comment", async (req, res) => {
  withDB(async (db) => {
    const name = req.params.name;
    const { user, comment } = req.body;

    const articleInfo = await db.collection("articles").findOne({ name: name });
    await db
      .collection("articles")
      .updateOne(
        { name: name },
        { $set: { comments: articleInfo.comments.concat({ user, comment }) } }
      );

    const updatedArticle = await db
      .collection("articles")
      .findOne({ name: name });

    res.status(200).json(updatedArticle);
  }, res);
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
