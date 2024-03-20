import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/navbar.css"
import { useNavigate } from 'react-router-dom';

const Navbar = ({ currentUser, handleLogout }) => {
    const navigate = useNavigate()
    const handle = () => {
        navigate('/contact');
    };

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <h1 className='navbar-logo'>Your Logo</h1>
                <div className='menu'>
                    <ul className='nav-menu'>
                        <li className='nav-item'>
                            <Link to='/posts' className='nav-links'>Create Post</Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/about' className='nav-links'>
                                About Us</Link>
                        </li>
                        <li className='nav-item'>
                            <button onClick={handleLogout} className='nav-links'>Logout</button>
                        </li>
                        <li className='nav-item'>
                            <button onClick={handle}className='nav-links'>Contact Us</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


