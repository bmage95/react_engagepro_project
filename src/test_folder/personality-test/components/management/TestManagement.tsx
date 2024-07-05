import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { setData, getData } from '../data/database.ts'
import DataModal from '../DataModel.tsx'
import QuestionItem from './QuestionItem.tsx'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

const initElem = () => {
    return {
        id: new Date().getTime().toString(),
        question: "",
        responses: []
    }
}

const TestManagement = () => {

    const [dataList, setDataList] = useState(getData())
    const [isOpen, setIsOpen] = useState(false)

    const [editElem, setEditElem] = useState<any>(initElem())

    const openEditModal = (id: string) => {
        setEditElem(dataList.find((elem: any) => elem.id === id))
        setIsOpen(true)
    }

    const closeEditModal = () => {
        setIsOpen(false)
        setEditElem(initElem())
    }

    useEffect(() => {
        setData(dataList)
    }, [dataList])

    const onEditElem = (data: any) => {
        if (dataList.find((elem: any) => elem.id === data.id) != undefined) {
            setDataList((prev: any) => (prev.map((elem: any) => {
                if (elem.id === data.id) {
                    return data
                }
                return elem
            })))
        } else {

            setDataList((prev: any) => ([...prev, data]))
        }
        setIsOpen(false)
        closeEditModal()
    }

    const removeElem = (id: string) => {
        setDataList((prev: any) => (prev.filter((elem: any) => elem.id !== id)))
    }

    return (
        <div className='TestMaker'>
            <div>
                <h1>Personality Test Maker</h1>
                <div>
                    <Fab onClick={() => setIsOpen(true)} className='AddQues' variant="extended">
                        <AddIcon />&nbsp;Add a Question
                    </Fab> 
                </div>
                <hr/>
                <div>
                {
                    dataList && dataList.map(
                        (item: any) => <QuestionItem key={item.id} item={item} editElem={openEditModal} removeElem={removeElem} />
                    )
                }
                </div>

            </div>
            {isOpen && <DataModal isOpen={isOpen} close={closeEditModal} question={editElem} save={onEditElem} />}
        </div>
    )
}

export default TestManagement