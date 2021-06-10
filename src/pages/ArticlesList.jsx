import Articles from "../components/Articles";
import content from "../data/content";

const ArticlesList = () => {
  return (
    <div className="article-list">
      <Articles content={content} />
    </div>
  );
};

export default ArticlesList;
