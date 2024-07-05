import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'

const initElem = () => {
    return {
        id: new Date().getTime().toString(),
        label: "",
        selected: false,
        score: ""
    }
}

interface DataModalProps {
    question: any,
    isOpen: boolean,
    close: any,
    save: any
}

const DataModal = ({
    question,
    isOpen,
    close,
    save
}: DataModalProps) => {

    const [data, setData] = useState<any>(question)


    useEffect(() => {
        setData(question)
    }, [isOpen])

    const onChangeResp = (e: any, id: string) => {
        setData((prev: any) => ({
            ...prev,
            responses: prev.responses.map((elem: any) => {
                if (elem.id == id) {
                    return {
                        ...elem,
                        [e.target.name]: e.target.name == "score" ? +e.target.value : e.target.value
                    }
                }
                return elem
            })
        }))
    }

    const onRemoveResp = (id: string) => {
        setData((prev: any) => ({
            ...prev,
            responses: prev.responses.filter((elem: any) => elem.id !== id)
        }))
    }

    const addResponse = () => {
        setData((prev: any) => ({ ...prev, responses: [...prev.responses, initElem()] }))
    }

    const invalidData = () => {
        return data.question == "" || data.responses.length < 2 ||
            data.responses.some((elem: any) => elem.label == "" || elem.score <= 0)
    }

    return (

        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={close}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <div className='flex justify-between'>
                                <input type='text' placeholder='Type the question' className='text-lg font-medium leading-6 text-gray-900 focus:outline-none'
                                    value={data?.question} onChange={(e: any) => setData({ ...data, question: e.target.value })} />
                                <button className='rounded-full p-2 bg-primary' onClick={addResponse}>
                                    <FaPlus className='text-white' />
                                </button>
                            </div>
                            <hr className='my-2' />
                            <div className="mt-2">
                                {
                                    data && data.responses && data.responses.map(
                                        (resp: any) => <div key={resp.id} className='flex justify-between items-center p-4'>
                                            <input type="text" name="label" placeholder='Response' className='py-1 px-2 border border-gray-300 w-full mr-4 rounded-md focus:border-primary focus:outline-none'
                                                value={resp.label} onChange={(e: any) => onChangeResp(e, resp.id)} />
                                            <input type="number" name="score" placeholder='Score' className='py-1 px-2 border border-gray-300 w-1/3 mr-4 rounded-md focus:border-primary focus:outline-none'
                                                value={resp.score} onChange={(e: any) => onChangeResp(e, resp.id)} />
                                            <button onClick={() => onRemoveResp(resp.id)} className='rounded-full p-2 bg-red-600'>
                                                <FaTrash className='text-white' />
                                            </button>
                                        </div>
                                    )
                                }
                            </div>

                            <div className="mt-4 flex gap-4 justify-end">
                                <button className='flex items-center text-sm md:text-base bg-primary text-white rounded-md py-2 px-4 disabled:bg-light disabled:cursor-not-allowed'
                                    onClick={() => save(data)} disabled={invalidData()}>
                                    Save
                                </button>
                                <button className='flex items-center text-sm md:text-base border-2 border-primary  rounded-md py-2 px-4' onClick={close}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default DataModal