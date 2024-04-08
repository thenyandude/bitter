import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Guide.css'

function Guide() {
  return (
    <div className="guide-container">
      <h1>Welcome to Bitter - User Guide</h1>
      <h2>Getting Started</h2>
      <p>
        Bitter is a microblogging platform where you can share your thoughts, discover others' posts, and connect with people.
      </p>
      
      <h2>Signing Up</h2>
      <p>
        To start using Bitter, you'll first need to sign up. Go to the SignUp page, enter a username and password, and confirm your password. Once registered, you can log in with your credentials.
      </p>

      <h2>Logging In</h2>
      <p>
        Use the login page to access your account. Enter your username and password, and you're in! If you're new, make sure to sign up first.
      </p>

      <h2>Exploring Posts</h2>
      <p>
        On the Landing page, you'll find a variety of posts from different users. To find posts from a specific user, just enter the username to see their posts.
      </p>

      <h2>Your Personalized Home</h2>
      <p>
        Your Home page is where you can create new posts and view your previous posts. Share your thoughts, and they will appear on your and others' home feeds.
      </p>

      <h2>Need Help?</h2>
      <p>
        If you need help or have questions, don't hesitate to reach out through our support channels. We're here to make your experience on Bitter enjoyable and hassle-free!
      </p>

      <Link to="/signup">
        <button className="get-started-button">Get Started</button>
      </Link>
    </div>
  );
}

export default Guide;
