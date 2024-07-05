import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import './PT_main.scss'

const QuestionItem = ({
    item,
    editElem,
    removeElem
}: any) => {
    return (
        <div>
            {item.question}
            <div>
            <Fab onClick={() => editElem(item.id)} className='edel' aria-description='edit'>
                <EditIcon />
            </Fab> 
            <Fab onClick={() => removeElem(item.id)} className='edel' aria-description='delete'>
                <DeleteIcon />
            </Fab> 
            </div>
        </div>
    )
}

export default QuestionItem