import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Post from "./components/Post";

const API_URL =
  " https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${API_URL}?_page=${page}&_limit=20`)
      .then((response) => response.json())
      .then((data) =>
        setPosts(
          data.map((post) => {
            return { ...post, likes: 0 };
          })
        )
      );
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedPost = { ...post, likes: post.likes + 1 };
        setLikes(likes + 1);
        return updatedPost;
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <p>Likes: {likes}</p>
      {filteredPosts.map((post) => (
        <Post key={post.id} post={post} handleLike={handleLike} />
      ))}
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default App;
