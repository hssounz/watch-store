import React, {useState, useEffect} from 'react'
import { useStateContext } from '../context/StateContext'
import { BsBagCheckFill } from 'react-icons/bs'
import Link from 'next/link';
import { runFireWorks } from '../lib/utils';
const success = () => {
    const { dispatch } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        dispatch({type: "reload"})
        runFireWorks();
    }, []);
  
  
    return (
    <div className='success-wrapper' >
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your purchase!</h2>
            <p className='email-msg'>Check your email inbox for the receipt.</p>
            <p className='description'>
                If you have any questions, email us!
                <a className='email' href='mailto:order@example.com'>
                    order@example.com
                </a>
            </p>
            <Link href={"/"} >
                <button type='button' className='btn' width="300px" >
                    Continue shopping
                </button>
            </Link>
        </div>
    </div>
  )
}

export default success