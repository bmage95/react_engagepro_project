import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function AppBar() {
  const { profile } = useContext(UserContext);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (profile?.picture) {
      setImgSrc(profile.picture);
    } else {
      setImgSrc(require('../assets/images/def_pfp.png'));
    }
  }, [profile]);

  return (
    <div className="appbar">
      <Link to='/'><h1 style={{ textAlign: "left" }}>Engage Pro</h1></Link>

      <Link to='/profile'>
        <img 
          src={imgSrc} 
          className='pfp' 
          style={{ width: '60px', height: '60px' }} 
          alt="pfp"
          onError={() => setImgSrc(require('../assets/images/def_pfp.png'))} 
        />
      </Link>

      <Link to='/contact-us'><button className='btn'>Contact Us</button></Link>
    </div>
  );
}