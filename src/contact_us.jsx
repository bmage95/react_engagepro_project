import React, { useState } from 'react';
import AppBar from './components/appbar';
import EmailEditor from 'react-email-editor';

function ContactUs() {
  console.log("Rendering ContactUs component");

  return (
    <div>
      <AppBar />
      <h2>Contact Us</h2>
        <form action="./send_email.php" method="post">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required/>
            <br/>
            
            <label for="email">Email Address:</label>
            <input type="email" id="email" name="email" required/>
            <br/>
            
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <br/>
            
            <input type="submit" value="Send"/>
        </form>
    </div>
  );
}

export default ContactUs;