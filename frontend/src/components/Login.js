import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';

const Login = ({ setCurrentUser }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            localStorage.setItem('accessToken', data.accessToken);
            setCurrentUser({ username: formData.username });
            window.alert("Logged in successfully")
            navigate('/homepage');
        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} method='POST'>
                <label htmlFor="name">Name:</label>
                <input id="name" name="username" type="text" value={formData.username} onChange={handleChange} placeholder="Enter your name" />
                <br />
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
                <br />
                <button type="submit">Submit</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
