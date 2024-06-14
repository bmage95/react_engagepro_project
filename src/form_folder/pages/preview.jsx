import React from 'react';
import '../builder_main.scss';

const PreviewPage = ({ formTitle, formContent }) => {
  return (
    <div className='preview_page'>
      <div>
        <h1>{formTitle}</h1>
      </div>
      <div className='width2'>
        {formContent.map((field) => (
          <div key={field.name} className='field'>
            <div>
              <label>{field.label}</label>
            </div>
            <div className='my-4'>
              {field.question_type === 'short_answer' && <input type="text" placeholder={field.label} />}
              {field.question_type === 'paragraph' && <textarea rows={4} placeholder={field.label} />}
              {field.question_type === 'multichoice' && (
                <select>
                  {field.list.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewPage;
