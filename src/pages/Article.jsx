import Articles from "../components/Articles";
import Error from "./Error";
import content from "../data/content";
import "./css/article.css";
import { useEffect, useState } from "react";

const Article = ({ match }) => {
  const name = match.params.name;
  const article = content.find((item) => item.name === name);
  const otherArticles = content.filter((item) => item.name !== name);

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    const getData = async () => {
      const result = await fetch(`/api/${name}`);
      const body = await result.json();
      console.log(body);
      setArticleInfo(body);
    };
    getData();
  }, [name]);

  if (!article) {
    return <Error />;
  }

  return (
    <div className="article-container">
      <h1 id="name">{article.title}</h1>
      <p>This article is liked by {articleInfo.upvotes} people</p>
      <p id="description">{article.article}</p>
      <div className="related">
        <h3 className="related-title">Related Articles:</h3>
        <Articles content={otherArticles} />
      </div>
    </div>
  );
};

export default Article;
