import React, { useState } from 'react';
import PinkSwitch from '../../components/required_button'
import '../builder_main.scss';

export default function QuestionEditor({ formTitle, setFormTitle, formContent, setFormContent }) {
  const [onEdit, setOnEdit] = useState(false);
  const [textField, setTextField] = useState("");
  const [editedField, setEditedField] = useState("");

  const addQuestion = () => {
    const field = {
      name: `question_${formContent.length}`,
      label: "Untitled question",
      question_type: "short_answer",
      list: [],
      required: false
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

  const editFieldType = (fieldName, fieldType) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex(f => f.name === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].question_type = fieldType;
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

  const toggleRequired = (fieldName) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex(f => f.name === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].required = !formFields[fieldIndex].required;
      setFormContent(formFields);
    }
  };

  return (
    <div className='container'>
      <div>
        <h1>Form Maker</h1>
      </div>
      <div className='field'>
        <input 
          type="text" 
          value={formTitle} 
          onChange={(e) => setFormTitle(e.target.value)} 
          placeholder="Title" 
          style={{position:"relative", right:"24px"}}
        />
        {formContent.map((field) => (
          <div key={field.name} className='field-item'>
            <div className='field-label'>
              {onEdit && editedField === field.name ? (
                <input
                  className='title'
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
            <PinkSwitch checked={field.required} onChange={() => toggleRequired(field.name)} />
          </div>
        ))}
        <div className='field'>
          <button onClick={addQuestion} className='Add_button'>Add Question</button>
        </div>
      </div>
    </div>
  );
}
