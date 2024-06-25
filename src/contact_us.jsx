import React, { useState } from "react";
import AppBar from "./components/appbar"
import "./contact_us.scss"

export default function MyForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const baseUrl = "http://localhost:3001";

  const sendEmail = async () => {
    let dataSend = {
      email: email,
      subject: subject,
      message: message,
    };

    const res = await fetch(`${baseUrl}/email/sendEmail`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // HANDLING ERRORS
      .then((res) => {
        console.log(res);
        if (res.status > 199 && res.status < 300) {
          alert("Send Successfully!");
        }
      });
  };

  return (
    <div className="formBlock">
      <AppBar/>
      <div>
        <h2>Email Us!</h2>
        <form onSubmit={(e) => { e.preventDefault(); sendEmail(); }} className="actual_form">

            <label>Your email: </label>
            <input
              type="email"
              placeholder="Receiver's Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /><br/>

            <label>Subject:</label>
            <input
              type="text"
              placeholder="Enter the subject here..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            /><br/>

            <label>Message:</label>
            <textarea
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea><br/>

          <button type="submit" className="submitBtn">Send Email</button>
        </form>
      </div>
    </div>
  );
}
