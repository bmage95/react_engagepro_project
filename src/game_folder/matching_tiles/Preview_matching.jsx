import React from 'react';
const MatchingPreview = ({ formContent, formTitle }) => {
  return (
    <div className='preview_page'>
      <div className='width3'>
        <h1>{formTitle}</h1>
      </div>
      <div className='width2'>
        {formContent.map((field, index) => (
          <div key={index} className='field'>
            <div>
              <label>{field.label}</label>
            </div>
            <div>
              {field.type === 'text' && <p>{field.value}</p>}
              {field.type === 'image' && <img src={field.src} alt={field.alt} className='preview_image' />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchingPreview;
