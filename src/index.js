import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ContactUs from './contact_us';
import FormBuilder from './form_folder/form_builder'
import QuizBuilder from './quiz_folder/quiz_builder'
import GameBuilder from './game_folder/game_builder'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/contact' element={<ContactUs />} />
                <Route path='/formbuilder' element={<FormBuilder />} />
                <Route path='/gamebuilder' element={<GameBuilder />} />
                <Route path='/quizbuilder' element={<QuizBuilder />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
