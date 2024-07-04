import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ContactUs from './contact_us';
import FormBuilder from './form_folder/form_builder';
import TestBuilder from './test_folder/test_builder';
import GameBuilder from './game_folder/game_builder';
import Builder from './form_folder/builder_main';
import MatchingTilesApp from './game_folder/matching_tiles/MatchingBuilder';
import YesNoGameBuilder from './game_folder/yesnogame/yesnogame_builder';
import PTBuilder from './test_folder/personality-test/PT_builder';
import TTBuilder from './test_folder/trivia-test/TT_builder';
import Profile from './profile';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './UserContext';  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="396668675274-ibdeen48qjo7k6h30pj9eb892ip9h20g.apps.googleusercontent.com">
    <React.StrictMode>
      <UserProvider> 
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/form-builder' element={<FormBuilder />} />
            <Route path='/game-builder' element={<GameBuilder />} />
            <Route path='/test-builder' element={<TestBuilder />} />
            <Route path='/form-builder/builder' element={<Builder />} />
            <Route path='/game-builder/matching-tiles' element={<MatchingTilesApp />} />
            <Route path='/game-builder/yesno-game' element={<YesNoGameBuilder />} />
            <Route path='/test-builder/personality-test' element={<PTBuilder />} />
            <Route path='/test-builder/trivia-test' element={<TTBuilder />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
