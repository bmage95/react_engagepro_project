import React from 'react';
import '../builder_main.scss'

export default function PreviewPage({ formContent }) {
  return (
    <div className='preview_page'>
      <div className=''>
        <h1 className=''>Form Maker Preview</h1>
        <h2 className=''>Untitled Form</h2>
      </div>
      <div className=''>
        {formContent.map((field) => (
          <div key={field.name}>
            <div className=''>
              <div className="">
                <label>{field.label}</label>
              </div>
            </div>
            <div className='my-4'>
              {field.question_type === 'short_answer' && <input type="text" className="" placeholder={field.label} />}
              {field.question_type === 'paragraph' && <textarea rows={4} className="" placeholder={field.label} />}
              {field.question_type === 'multichoice' && (
                <select className=''>
                  {field.list.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
