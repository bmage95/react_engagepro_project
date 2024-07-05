import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getData } from '../data/database.ts';
import TestUI from './TestUI.tsx';

const Test = () => {
    const [index, setIndex] = useState<number>(0)
    const [data, setData] = useState<any>(getData())

    const navigate = useNavigate();

    const calculateScore = () => {
        let score = 0
        data.forEach((question: any) => {
            question.responses.forEach((resp: any) => {
                if(resp.selected){
                    score += resp.score
                }
            })
        });
        navigate(`/test-builder/personality-test/result`, {state: {score}});
    }

    const nextQuestion = () => {
        if (data.length - index == 1) {
            calculateScore()
        } else {
            setIndex((prev: number) => (++prev))
        }
    }

    const prevQuestion = () => {
        if (index > 0) {
            setIndex((prev: number) => (--prev))
        }
    }

    const selectAnswer = (id: string) => {
        setData((prev: any) => (prev.map((item: any, i: number) => {
            if (i == index) {
                return {
                    ...item,
                    responses: item.responses.map((resp: any) => {
                        if (resp.id === id) {
                            return {
                                ...resp, selected: true
                            }
                        }
                        return {
                            ...resp, selected: false
                        }
                    })
                }
            }
            return item
        })))
    }

    const isAnswerSelected = () => {
        return data[index].responses.some((elem: any) => elem.selected)
    }

    return <TestUI data={data}
        index={index}
        selectAnswer={selectAnswer}
        prevQuestion={prevQuestion}
        nextQuestion={nextQuestion}
        isAnswerSelected={isAnswerSelected}/>
}

export default Test