import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import ProductCard from './ProductCard'
import { getAllProducts } from '../actions/productActions'
import SkeletonCards from './SkeletonCards'

const ProductContainer = () => {

    const dispatch = useDispatch()
    const { loading, products } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllProducts())

    }, [dispatch])

    return (
        <>
            {
                loading ? (
                    <SkeletonCards />
                )

                    : (

                        <Container sx={{ marginTop: 2 }}>
                            <Box display={'flex'} alignItems='center' justifyContent={'space-evenly'} flexWrap={'wrap'}>

                                {
                                    products ? (products.map(product => (
                                        <ProductCard key={product._id} product={product} />
                                    ))) :
                                        (
                                            <>
                                                <Typography variant='h5' color={'gray'}>
                                                    Sorry No Such data found
                                                </Typography>
                                            </>
                                        )

                                }
                            </Box>



                        </Container>)
            }

        </>
    )
}

export default ProductContainer