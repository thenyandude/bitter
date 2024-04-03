import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserHome() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/posts?userId=${userId}`);
      setPosts(response.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  useEffect(() => {
    if (userId) fetchPosts();
    // Set up a timer to fetch posts every 30 seconds
    const intervalId = setInterval(fetchPosts, 30000); // adjust the time as appropriate

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [userId]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/posts', { userId, title, content });
      // Use the complete post object from the response
      setPosts([response.data, ...posts]);
      setTitle('');
      setContent('');
      fetchPosts(); // Re-fetch posts to ensure the list is updated
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <div className="container">
      <h2>Create a New Post</h2>
      <form onSubmit={handleCreatePost}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </label>
        <button type="submit">Publish Post</button>
      </form>

      <div>
        <h3>Previous Posts:</h3>
        {posts.map((post, index) => (
          <div key={index} className="post">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserHome;
