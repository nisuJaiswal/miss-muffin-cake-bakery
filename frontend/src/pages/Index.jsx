import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProductContainer from '../components/ProductContainer'


const Index = () => {
    const { isAuthenticated } = useSelector((state) => state.user)
    // const { loading } = useSelector(state => state.products)

    // const navigator = useNavigate()
    const navigator = useNavigate()


    useEffect(() => {
        if (!isAuthenticated) {
            navigator('/login')
        }
    }, [isAuthenticated, navigator])

    return (
        <>

            <Navbar />

            <ProductContainer />

        </>
    )
}

export default Index