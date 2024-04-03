import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserHome({ userId }) { // Accept userId as a prop
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/posts?userId=${userId}`);
        setPosts(response.data.slice(0, 5)); // Get only the first 5 posts
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, [userId]);



  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/posts', { userId, title, content });
      setPosts([{ title, content }, ...posts]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  return (
    <div>
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
          <div key={index}>
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserHome;
