import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const QuestionItem = ({
    item,
    editElem,
    removeElem
}: any) => {
    return (
        <div className='flex justify-between border-b-2 py-1'>
            {item.question}
            <div>
            <button onClick={() => editElem(item.id)} className='rounded-full p-3 bg-primary mx-1'>
                <FaEdit className='text-white' />
            </button>
            <button onClick={() => removeElem(item.id)} className='rounded-full p-3 bg-red-600 mx-1'>
                <FaTrash className='text-white' />
            </button>
            </div>
        </div>
    )
}

export default QuestionItem