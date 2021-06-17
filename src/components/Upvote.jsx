import "../pages/css/upvote.css";

const Upvote = ({ upvotes, setArticleInfo, name }) => {
  const addUpvote = async () => {
    const res = await fetch(`http://localhost:8000/api/${name}/upvote`, {
      method: "post",
    });
    const data = await res.json();
    setArticleInfo(data);
  };

  return (
    <div className="upvote">
      <button className="upvote-btn" onClick={addUpvote}>
        Upvote
      </button>
      <p>This article is liked by {upvotes} people</p>
    </div>
  );
};

export default Upvote;
