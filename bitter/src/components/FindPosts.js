import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function FindPosts() {
  const [posts, setPosts] = useState([]);
  const { username } = useParams(); // Get username from URL

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/posts/${username}`);
        setPosts(response.data.slice(0, 5)); // Get only the first 5 posts
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, [username]);

  return (
    <div>
      <h2>Posts by {username}</h2>
      <div>
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

export default FindPosts;
