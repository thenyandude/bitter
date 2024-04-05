import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/App.css'; // Assuming your CSS file is located here

function FindPosts() {
  const [posts, setPosts] = useState([]);
  const { username } = useParams(); // Get username from URL

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://10.12.5.206/api/posts/${username}`);
        setPosts(response.data); // Get all posts
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, [username]);

  return (
    <div className="container"> {/* Make sure you have a container class in your CSS */}
      <h2>Posts by {username}</h2>
      <div className="posts-container"> {/* Add a container to wrap the posts */}
        {posts.map((post, index) => (
          <div key={index} className="post"> {/* Apply the post class to each post */}
            <h4>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindPosts;
