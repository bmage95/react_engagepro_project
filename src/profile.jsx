import React, { useContext, useEffect } from 'react';
import AppBar from './components/appbar';
import { UserContext } from './UserContext';
import './profile.css';

const Profile = () => {
  const { profile, login, logOut } = useContext(UserContext);

  useEffect(() => {
    console.log('Profile data:', profile);
  }, [profile]);

  return (
    <div>
      <AppBar profile={profile} />
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="Profile" style={{ width: '96px', height: '96px' }} onError={(e) => console.error('Error loading image:', e.nativeEvent)} />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut} className='btn2'>Sign out</button>
        </div>
      ) : (
        <button onClick={login} className='btn2' style={{ float: 'left', top: '0', margin: '0 0 0 0', fontSize: '32px' }}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" className='img2' />
          Sign in with Google&nbsp;
        </button>
      )}
    </div>
  );
};

export default Profile;
