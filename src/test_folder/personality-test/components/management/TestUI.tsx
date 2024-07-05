import React from 'react'
import { FaChevronLeft, FaChevronRight, FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const TestUI = ({
    data,
    index,
    selectAnswer,
    prevQuestion,
    nextQuestion,
    isAnswerSelected
}: any) => {
    return (
        <div className='flex justify-start items-center h-screen px-12 md:px-24 pt-24'>
            <div className={`flex flex-col gap-6 w-full ${data && data.length > 3 ? 'overflow-auto' : ''}`}>
                <div className='flex items-center justify-between'>
                    <Link to="/" className='flex items-center text-sm md:text-base border-2 border-primary  rounded-md py-2 px-4'>
                        <FaHome className='mx-1' />
                        Home
                    </Link>
                </div>
                <hr className='my-2 bg-primary h-[2px]' />
                {
                    data && data.length < 3 ? (
                        <p className='text-4xl text-center text-primary'>
                            The test should contain at least 3 questions
                        </p>
                    ) : (
                        <>
                            <div>
                                <span className='text-2xl font-bold'>
                                    {data[index].question}
                                </span>
                                <div className='flex flex-col items-start gap-4 mt-4 h-[40vh] overflow-auto'>
                                    {
                                        data[index].responses.map((resp: any) =>
                                            <button key={resp.id} onClick={() => selectAnswer(resp.id)}
                                                className={`py-4 px-8 w-full text-left rounded-lg bg-slate-200 focus:border-2 focus:border-primary ${resp.selected ? 'border-2 border-primary' : ''}`}>
                                                {resp.label}
                                            </button>)
                                    }
                                </div>
                            </div>
                            <div className='flex justify-around'>
                                <button onClick={prevQuestion} disabled={index == 0}
                                    className='flex items-center justify-center py-2 w-40 rounded-lg border-2 border-primary hover:bg-primary hover:text-white disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed'>
                                    <FaChevronLeft className='mx-2' />
                                    Previous
                                </button>
                                <button onClick={nextQuestion} disabled={!isAnswerSelected()}
                                    className='flex items-center justify-center py-2 w-40 rounded-lg border-2 border-primary hover:bg-primary hover:text-white disabled:bg-slate-50 disabled:text-slate-600 disabled:cursor-not-allowed'>
                                    {data.length - index == 1 ? 'Finish Test' : 'Next'}
                                    <FaChevronRight className='mx-2' />
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default TestUI