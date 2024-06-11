import React, { useState } from 'react';
import AppBar from './components/appbar';
import EmailEditor from 'react-email-editor';

function ContactUs() {
    console.log("Rendering ContactUs component");
    const [emailContent, setEmailContent] = useState(null);

    const onSave = () => {
        // Get the email template content
        window.editor.saveDesign((data) => {
            setEmailContent(data);
        });
    };

    const sendEmail = () => {
        // Implement logic to send email using Nodemailer or other email sending service
        if (emailContent) {
            const emailData = {
                // Add email subject, body, recipient, etc.
                // You can customize this based on your needs
                subject: 'Contact Us Email',
                body: emailContent,
                recipient: 'example@example.com'
            };

            // Example of sending email using fetch API
            fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Email sent:', data);
                // Implement feedback to the user, e.g., show success message
            })
            .catch(error => {
                console.error('Error sending email:', error);
                // Implement feedback to the user, e.g., show error message
            });
        }
    };

    return (
        <div>
            <AppBar />
            <h2>Contact Us</h2>
            <EmailEditor
                onLoad={() => console.log('Email editor loaded')}
                onSave={onSave}
                ref={editor => window.editor = editor}
            />
            <button onClick={sendEmail}>Send Email</button>
        </div>
    );
}

export default ContactUs;
