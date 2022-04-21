import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getItemDetails } from '../actions/productActions'
import Navbar from '../components/Navbar'

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.user)
    const { loading } = useSelector(state => state.products)
    const { productDetail } = useSelector(state => state.productDetail)
    const navigator = useNavigate()
    const CenterItemBox = styled(Box)({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh'
    });
    useEffect(() => {
        if (!isAuthenticated) {
            navigator('/login')
        }
        dispatch(getItemDetails(match.params.id))
    }, [isAuthenticated, navigator, match.params.id, dispatch])

    return (
        <>
            {
                loading ? (
                    <CenterItemBox>

                        <CircularProgress color="inherit" />
                    </CenterItemBox>
                )
                    :
                    <>
                        <Navbar />
                        <h1>{productDetail}</h1>)
                    </>
            }

        </>
    )
}

export default ProductDetails