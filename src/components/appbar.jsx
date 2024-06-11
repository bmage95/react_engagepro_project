import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function AppBar() {
  const { profile } = useContext(UserContext);

  return (
    <div className="appbar">
      <Link to='/'><h1 style={{ textAlign: "left" }}>Engage Pro</h1></Link>

      <Link to='/profile'><img 
        src={profile && profile.picture ? profile.picture : require('../assets/images/def_pfp.png')} 
        className='pfp' 
        style={{ width: '60px', height: '60px' }} alt="pfp"/>
      </Link>

      <Link to='/contact-us'><button className='btn'>Contact Us</button></Link>
    </div>
  );
}
