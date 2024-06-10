import React from 'react';
import { Link } from 'react-router-dom';

export default function AppBar() {
    return (
        <div className="appbar">
            <Link to='/'><h1 style={{ textAlign: "left" }}>Engage Pro</h1></Link>
            <Link to='/profile'><button className='btn'>Profile</button></Link>
            <Link to='/contact-us'><button className='btn'>Contact Us</button></Link>
        </div>
    );
}
