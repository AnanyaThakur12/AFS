import React, { useState, useEffect } from 'react';
import '../styles/Posts.css'
import { useNavigate } from 'react-router-dom';

const Posts = () => {
    const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/posts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const fetchedPosts = await response.json();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    // Clear access token from localStorage
    localStorage.removeItem('accessToken');
    
    // Redirect to the login page or any other desired page
    navigate('/login');
};

  return (
    <div className='posts-container'>
      <h1>Posts</h1>
      <ul className='posts-list'>
        {posts.map(post => (
          <li key={post._id} className='post-item'>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-content'>{post.content}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Posts;
