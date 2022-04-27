import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Cart = () => {

    const { isAuthenticated } = useSelector(state => state.user)
    const navigator = useNavigate();
    const { cartItems } = useSelector(state => state.cart)
    useEffect(() => {
        if (!isAuthenticated) {
            return navigator('/login')
        }
    }, [])

    return (
        <>
            <Navbar />
            {cartItems.map(i => <h3 key={i.name}>{i.name}</h3>)}
        </>
    )
}

export default Cart