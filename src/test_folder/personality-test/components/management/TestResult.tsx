import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import AppBar from '../../../../components/appbar';

const TestResult = () => {
    const { state }: any = useLocation()
    return (
        <div className='flex flex-col gap-12 justify-center items-center h-screen px-12 md:px-24 pt-24'>
            <AppBar/>
            <p className='animate__animated animate__fadeInUp text-4xl text-center font-bold text-slate-600'>
                You are an {state.score > 10 ? 'Extrovert' : 'Introvert'}
            </p>
            <p className='animate__animated animate__fadeInUp animate__delay-2s text-4xl text-center font-bold text-slate-600'> You are awesome </p>
        </div>
    )
}

export default TestResult