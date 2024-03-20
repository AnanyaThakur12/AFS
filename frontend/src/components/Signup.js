import React, { useState } from 'react'
import '../styles/form.css'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const nav = useNavigate()
    const [user, setUser] = useState({
        name: "",
        password: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    
    const postData = async (e) => {
        e.preventDefault();

        const { name, password } = user;

        try {
                        const response = await fetch("/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ 
                                username: name, password })
                        });
                
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                
                        const text = await response.text();
                        const data = text ? JSON.parse(text) : {};
                
                        if (data.status === 422) {
                            window.alert("Invalid");
                            console.log("Invalid");
                        } else {
                            window.alert("Registered Successfully");
                            console.log("Registered Successfully");
                            nav('/login')
                        }
                    } catch (error) {
                        console.error("Error:", error);
                        window.alert("Error occurred while processing the request");
                    }
    };

    return (
        <div className='container'>
            <h1>Sign up</h1>
            <form onSubmit={postData} method='POST'>
                <label htmlFor="name">Name:</label>
                <input id="name" name="name" type="text" value={user.name} onChange={handleInput} placeholder="Enter your name" />
                <br></br>
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" value={user.password} onChange={handleInput} placeholder="Enter your password" />
                 <br></br>
                <button type="submit">Submit</button>
                <p>Already Registered?</p>
            </form>
        </div>
    );
};

export default Signup;