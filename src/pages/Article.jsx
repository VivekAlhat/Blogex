import Articles from "../components/Articles";
import Error from "./Error";
import content from "../data/content";
import "./css/article.css";

const Article = ({ match }) => {
  const name = match.params.name;
  const article = content.find((item) => item.name === name);
  const otherArticles = content.filter((item) => item.name !== name);

  if (!article) {
    return <Error />;
  }

  return (
    <div className="article-container">
      <h1 id="name">{article.title}</h1>
      <p id="description">{article.article}</p>
      <div className="related">
        <h3 className="related-title">Related Articles:</h3>
        <Articles content={otherArticles} />
      </div>
    </div>
  );
};

export default Article;
