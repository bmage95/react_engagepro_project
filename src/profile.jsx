import React, { useContext, useEffect } from 'react';
import AppBar from './components/appbar';
import { UserContext } from './UserContext';
import './profile.scss';

const Profile = () => {
  
  const { profile, login, logOut } = useContext(UserContext);

  useEffect(() => {
    console.log('Profile data:', profile);
  }, [profile]);

  return (
    <div className='profile_page_display'>
      <AppBar profile={profile} />
      <h2>Please sign into <span>Google</span> before using any <span>services</span></h2>
      <br />
      <br />
      {profile ? (
        //user details and sign out button 
        <div className='profile_body'>
          <img src={profile.picture} alt="Profile" style={{ width: '96px', height: '96px' }} onError={(e) => console.error('Error loading image:', e.nativeEvent)} />
          <h3>User is Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          
          <button onClick={logOut}>
            <span class="transition"></span>
            <span class="gradient"></span>
            <span class="label">Sign out</span>
          </button>
        </div>

      ) : (
          //sign in button
        <div className='btn3'>
          <button class="button" onClick={login}>
                  <div class="bgContainer">
                    <span><img src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" className='img2' /></span>
                    <span style={{color:'black'}}>Sign in</span>
                    <span style={{color:'black'}}>!</span>
                  </div>
                  <div class="arrowContainer">
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 45 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M43.7678 20.7678C44.7441 19.7915 44.7441 18.2085 43.7678 17.2322L27.8579 1.32233C26.8816 0.34602 25.2986 0.34602 24.3223 1.32233C23.346 2.29864 23.346 3.88155 24.3223 4.85786L38.4645 19L24.3223 33.1421C23.346 34.1184 23.346 35.7014 24.3223 36.6777C25.2986 37.654 26.8816 37.654 27.8579 36.6777L43.7678 20.7678ZM0 21.5L42 21.5V16.5L0 16.5L0 21.5Z"
                        fill="black"
                      ></path>
                    </svg>
                  </div>
                </button>
              </div>
      )}
      <span style={{position:'absolute', right:'20px', bottom:'20px', fontStyle:'italic', fontWeight:'300', fontSize:'24px'}}>
        click on logo to redirect to home page</span>
    </div>
  );
};

export default Profile;
