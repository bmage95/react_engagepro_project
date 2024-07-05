import React from 'react'
import { FaChevronLeft, FaChevronRight, FaHome } from 'react-icons/fa'
import './PT_main.scss'

const TestUI = ({
    data,
    index,
    selectAnswer,
    prevQuestion,
    nextQuestion,
    isAnswerSelected
}: any) => {
    return (
        <div className='TestUI'>
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
                                <span>
                                    {data[index].question}
                                </span>
                                <div>
                                    {
                                        data[index].responses.map((resp: any) =>
                                            <button key={resp.id} onClick={() => selectAnswer(resp.id)}>
                                                {resp.label}
                                            </button>)
                                    }
                                </div>
                            </div>
                            <div>
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