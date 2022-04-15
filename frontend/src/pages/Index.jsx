import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Index = () => {
    // const { isAuthenticated } = useSelector(state => state.user)
    const { isAuthenticated } = useSelector((state) => state.user)
    // const navigator = useNavigate()
    const navigator = useNavigate()

    console.log(isAuthenticated)


    useEffect(() => {
        console.log("FROM INDEX", isAuthenticated)
        if (!isAuthenticated) {

            navigator('/login')
        }
    }, [isAuthenticated, navigator])

    return (
        <h1>Hello From Index 👌</h1>
    )
}

export default Index