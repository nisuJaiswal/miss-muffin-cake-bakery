import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from "@mui/material"
import Navbar from '../components/Navbar'


const Index = () => {
    // const { isAuthenticated } = useSelector(state => state.user)
    const { isAuthenticated, loading } = useSelector((state) => state.user)

    // const navigator = useNavigate()
    const navigator = useNavigate()


    useEffect(() => {
        if (!isAuthenticated) {
            navigator('/login')
        }
    }, [isAuthenticated, navigator])

    return (
        <>
            {
                loading ? (<CircularProgress color="inherit" />)
                    :

                    (
                        <>
                            <Navbar />

                            <h1> Hello from Index 👋 </h1>
                        </>
                    )
            }
        </>
    )
}

export default Index