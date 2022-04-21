import styled from '@emotion/styled'
import { Avatar, CircularProgress, Container } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getItemDetails } from '../actions/productActions'
import Navbar from '../components/Navbar'

const ProductDetails = ({ match }) => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { isAuthenticated } = useSelector(state => state.user)
    const { productDetail, loading } = useSelector(state => state.productDetail)
    const navigator = useNavigate()
    const CenterItemBox = styled(Box)({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh'
    });

    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [image, setimage] = useState()

    useEffect(() => {
        if (!isAuthenticated) {
            navigator('/login')
        }
        if (productDetail) {
            const { name, description, price, image } = productDetail
            setName(name)
            setDescription(description)
            setPrice(price)
            setimage(image)
        }
        dispatch(getItemDetails(id))
    }, [isAuthenticated, navigator, id, dispatch])

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
                        <Container>
                            <Avatar
                                variant='square'
                                alt="Cake"
                                src={image}
                                sx={{ width: 150, height: 150 }}
                            />
                        </Container>
                    </>
            }

        </>
    )
}

export default ProductDetails