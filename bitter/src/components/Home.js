import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/posts');
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
        <div>
            <h2>Siste på Bitter</h2>
            <div>
                {recentPosts.map((post, index) => (
                    <div key={index}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>Posted by: {post.userId?.username} on {new Date(post.created).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
