import React, { useEffect, useState } from 'react'
import { FaHome, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { setData, getData } from '../data/database.ts'
import DataModal from '../DataModel.tsx'
import QuestionItem from './QuestionItem.tsx'

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
        <div className='flex justify-start items-center h-screen px-12 md:px-24 pt-24'>
            <div className='flex flex-col gap-6 w-full'>
                <div className='flex items-center justify-between'>
                    <Link to="/" className='flex items-center text-sm md:text-base border-2 border-primary  rounded-md py-2 px-4'>
                        <FaHome className='mx-1' />
                        Home
                    </Link>
                    <button className='flex items-center text-sm md:text-base bg-primary text-slate-50 rounded-md py-2 px-4' onClick={() => setIsOpen(true)}>
                        <FaPlus className='mx-1' />
                        Add a question
                    </button>
                </div>
                <hr className='my-2 bg-primary h-[2px]' />
                <div className='flex flex-col gap-6 w-full h-[60vh] overflow-auto'>
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