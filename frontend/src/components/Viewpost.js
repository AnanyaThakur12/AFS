import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Viewpost = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: '', content: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                },
                body: JSON.stringify(post)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            navigate('/check');
        } catch (error) {
            console.error('Error creating post:', error);
            setError('Error occurred while creating the post');
        }
    };

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input id="title" name="title" type="text" value={post.title} onChange={handleChange} placeholder="Enter post title" />
                <br />
                <label htmlFor="content">Content:</label>
                <textarea id="content" name="content" value={post.content} onChange={handleChange} placeholder="Enter post content"></textarea>
                <br />
                <button type="submit">Submit</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Viewpost;

