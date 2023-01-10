import Link from 'next/link'
import React from 'react'
import {AiOutlineShopping} from 'react-icons/ai'
import { useStateContext } from '../context/StateContext'
import Cart from './Cart'

const NavBar = () => {
  const {state, dispatch} = useStateContext();
  const {showCart, totalQuantities} = state;
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href={"/"} >Luxury Watches</Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => dispatch({type: "setshowCart", value: !showCart})}>
        <AiOutlineShopping />
      <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      { showCart && <Cart />}
    </div>
  )
}

export default NavBar