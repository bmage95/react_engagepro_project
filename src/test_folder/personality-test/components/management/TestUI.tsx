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
        <div>
            <div>
                <h1>Personality Test Preview</h1>
                <hr/>
                {
                    data && data.length < 3 ? (
                        <p>
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
                                <button onClick={prevQuestion} disabled={index == 0}>
                                    <FaChevronLeft/>
                                    Previous
                                </button>
                                <button onClick={nextQuestion} disabled={!isAnswerSelected()}>
                                    {data.length - index == 1 ? 'Finish Test' : 'Next'}
                                    <FaChevronRight/>
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