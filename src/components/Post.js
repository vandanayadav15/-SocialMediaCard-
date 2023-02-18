import React, { useState } from "react";

const Post = ({ post, handleLike }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
    handleLike(post.id);
  };

  return (
    <div className="card">
      <img src={`https://picsum.photos/200?random=${post.id}`} alt="" />
      <p>User ID: {post.userId}</p>
      <p>Title: {post.title}</p>
      <p>Likes: {post.likes}</p>
      <button onClick={handleLikeClick}>{liked ? "Unlike" : "Like Post"}</button>
    </div>
  );
};

export default Post;
