import "../pages/css/comment.css";

const CommentList = ({ commentData }) => {
  return (
    <div className="comment">
      <h3>Comments:</h3>
      {commentData.map((item, key) => (
        <div className="commentDetails" key={key}>
          <h4>{item.user}</h4>
          <p>- {item.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
