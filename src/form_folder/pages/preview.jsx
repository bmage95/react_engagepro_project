import React, { useState } from 'react';
import '../builder_main.scss';

const PreviewPage = ({ formTitle, formContent }) => {   //eslint-disable-next-line
  const [formValid, setFormValid] = useState(true);   

  const validateForm = (e) => {

    e.preventDefault();
    let isValid = true;
    formContent.forEach((field) => {
      if (field.required) {
        const input = document.getElementById(field.name);
        if (input && !input.value) {
          isValid = false;
          input.classList.add('error');
        } else if (input) {
          input.classList.remove('error');
        }
      }
    });

    setFormValid(isValid);
    if (isValid) {
      // Handle form submission here
      alert('Form Valid!');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <form className='preview_page' onSubmit={validateForm}>
      <div className='width3'>
        <h1>{formTitle}</h1>
      </div>
      <div className='width2'>
        {formContent.map((field) => (
          <div key={field.name} className='field'>
            <div>
              <label>{field.label}</label>
            </div>
            <div>
              {field.question_type === 'short_answer' && <input type="text" id={field.name} placeholder={field.label} required={field.required} />}
              {field.question_type === 'paragraph' && <textarea rows={4} id={field.name} placeholder={field.label} required={field.required} />}
              {field.question_type === 'multichoice' && (
                <select id={field.name} required={field.required}>
                  {field.list.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
      <button type="submit" className='submit_button'>Submit</button>
    </form>
  );
};

export default PreviewPage;
