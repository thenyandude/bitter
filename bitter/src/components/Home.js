import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://10.12.5.206:3000/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts", error);
                // Handle the error appropriately
            }
        };

        fetchPosts();
    }, []);

    const recentPosts = posts.slice(0, 5); // Get the first 5 posts

    return (
        <div className="container">
          <h2>Siste på Bitter</h2>
          {recentPosts.map((post, index) => (
            // Apply the .post class to each post container
            <div key={index} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>Posted by: {post.userId?.username} on {new Date(post.created).toLocaleString()}</small>
            </div>
          ))}
        </div>
      );      
}

export default Home;
