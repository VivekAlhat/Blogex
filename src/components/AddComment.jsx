import { useState } from "react";
import "../pages/css/add-comment.css";

const AddComment = ({ articleName, setArticleInfo }) => {
  const [commentDetails, setCommentDetails] = useState({
    user: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8000/api/${articleName}/add-comment`,
      {
        method: "post",
        body: JSON.stringify(commentDetails),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    setArticleInfo(data);
    setCommentDetails({
      user: "",
      comment: "",
    });
  };

  return (
    <div className="add-comment">
      <h3>Add a comment</h3>
      <label>User: </label>
      <input
        name="user"
        type="text"
        value={commentDetails.user}
        onChange={handleChange}
      />
      <label>Comment: </label>
      <textarea
        name="comment"
        rows="4"
        cols="50"
        value={commentDetails.comment}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Comment</button>
    </div>
  );
};

export default AddComment;
