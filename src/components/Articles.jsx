import { Link } from "react-router-dom";
import "../pages/css/articlelist.css";

const Articles = ({ content }) => {
  return (
    <>
      <ul className="articles">
        {content.map((article, key) => (
          <li className="article-link" key={key}>
            <Link to={`/article/${article.name}`}>
              <h3>{article.title}</h3>
            </Link>
            <p>{article.article.substring(0, 150)}...</p>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Articles;
