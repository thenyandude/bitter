import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import '../css/UserHome.css'
import '../css/App.css'

function UserHome() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [charCount, setCharCount] = useState(0);
  const userId = localStorage.getItem('userId');

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setCharCount(newContent.length);
  };

  // Function to fetch posts
  const fetchPosts = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/posts?userId=${userId}`);
      setPosts(response.data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchPosts();
    const intervalId = setInterval(fetchPosts, 30000);
  
    return () => clearInterval(intervalId);
  }, [userId, fetchPosts]); // Include fetchPosts in the dependency array

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

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/${postId}`);
      // Remove the post from the state to update UI
      setPosts(currentPosts => currentPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post', error);
      // Handle errors (e.g., display a message to the user)
    }
  };
  

  return (
    <div className="user-home-container">
      <div className="create-post-form">
        <h2>Create a New Post</h2>
        <form onSubmit={handleCreatePost}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <div className="form-group">
                <label htmlFor="postContent">Content: (100 characters max)</label>
                <textarea 
                  id="postContent"
                  value={content} 
                  onChange={handleContentChange} 
                  placeholder="What's on your mind?"
                  maxLength="100"
                ></textarea>
              <div className="character-counter">
      {charCount}/100 characters
    </div>
  </div>
          <button type="submit">Publish Post</button>
        </form>
      </div>
      <div className="posts-list">
        <h3>Previous Posts:</h3>
        {posts.map((post, index) => (
          <div key={index} className="post-item">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            <button className="delete-post-button" onClick={() => deletePost(post._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default UserHome;