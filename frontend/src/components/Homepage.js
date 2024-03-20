import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import "../styles/homepage.css"

const Homepage = ({ currentUser, setCurrentUser }) => { 
    const navigate = useNavigate(); 

    const handleCreatePost = () => {
        navigate('/posts');
    };

    const handleViewPosts = () => {
        navigate('/check');
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
       
        setCurrentUser(null); 
    
        navigate('/login');
    };
    
    return (
        <div>
            <Navbar currentUser={currentUser} handleLogout={handleLogout} />
            <div className='default'>
                <h1>Welcome, {currentUser ? currentUser.username : ''}</h1>
                <button onClick={handleCreatePost}>Create Post</button>
                <button onClick={handleViewPosts}>View Posts</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Homepage;
