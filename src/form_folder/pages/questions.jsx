import React, { useState } from 'react';

export default function QuestionEditor({ formContent, setFormContent }) {
  const [onEdit, setOnEdit] = useState(false);
  const [textField, setTextField] = useState("");
  const [editedField, setEditedField] = useState("");

  const addQuestion = () => {
    const field = {
      name: `question_${formContent.length}`,
      label: "Untitled question",
      question_type: "short_answer",
      list: []
    };
    setFormContent([...formContent, field]);
  };

  const editField = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex(f => f.name === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].label = fieldLabel;
      setFormContent(formFields);
    }
  };

  const editFieldType = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex(f => f.name === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].question_type = fieldLabel;
      setFormContent(formFields);
    }
  };

  const addFieldOption = (fieldName, option) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex(f => f.name === fieldName);
    if (fieldIndex > -1) {
      if (option && option !== "") {
        formFields[fieldIndex].list.push(option);
        setFormContent(formFields);
        setTextField("");
      }
    }
  };

  return (
    <div className='container'>
      <div>
        <h1>Form Maker</h1>
        <h2>Untitled Form</h2>
      </div>
      <div className='field'>
        {formContent.map((field, index) => (
          <div key={field.name} className='field-item'>
            <div className='field-label'>
              {onEdit && editedField === field.name ? (
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => editField(field.name, e.target.value)}
                  onBlur={() => { setOnEdit(false); setEditedField(""); }}
                />
              ) : (
                <label onClick={() => { setOnEdit(true); setEditedField(field.name); }}>{field.label}</label>
              )}
            </div>
            <div className='field-type'>
              <select className='select' onChange={(e) => editFieldType(field.name, e.target.value)}>
                <option value="short_answer">Short Answer</option>
                <option value="paragraph">Paragraph</option>
                <option value="multichoice">Multichoice</option>
              </select>
            </div>
            <div className='field-input'>
              {field.question_type === 'short_answer' && <input type="text" className="input-text" placeholder={field.label} />}
              {field.question_type === 'paragraph' && <textarea rows={4} className="textarea" placeholder={field.label} />}
              {field.question_type === 'multichoice' && (
                <div className='multichoice'>
                  <select className='select'>
                    {field.list.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                  <div className='multichoice-option'>
                    <input type="text" onChange={(e) => setTextField(e.target.value)} value={textField} placeholder="Add an option" className='multichoice-input' />
                    <button onClick={() => addFieldOption(field.name, textField)}>Add</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className='field'>
          <button onClick={addQuestion}>Add Question</button>
        </div>
      </div>
    </div>
  );  
}

