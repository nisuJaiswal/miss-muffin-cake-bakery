import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Container, Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import ProductCard from './ProductCard'
import { getAllProducts } from '../actions/productActions'

const ProductContainer = () => {

    const dispatch = useDispatch()
    const { loading, products } = useSelector(state => state.products)
    // console.log(products)
    // const CenterItemBox = styled(Box)({
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: '90vh'
    // });

    useEffect(() => {
        dispatch(getAllProducts())

    }, [dispatch])

    return (
        <>
            {
                loading ? (
                    <Box display={'flex'} alignItems='center' justifyContent={'space-evenly'} flexWrap={'wrap'}>
                        {/* <CircularProgres
                        s color="inherit" /> */}


                        <Card sx={{ minWidth: 300, maxWidth: 345, margin: 2, padding: 4 }}>
                            <Skeleton variant="rectangular" width={270} height={250} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={40} width={270} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={25} width={100} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={50} width={130} sx={{ marginLeft: 1 }} />
                        </Card>
                        <Card sx={{ minWidth: 300, maxWidth: 345, margin: 2, padding: 4 }}>
                            <Skeleton variant="rectangular" width={270} height={250} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={40} width={270} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={25} width={100} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={50} width={130} sx={{ marginLeft: 1 }} />
                        </Card>
                        <Card sx={{ minWidth: 300, maxWidth: 345, margin: 2, padding: 4 }}>
                            <Skeleton variant="rectangular" width={270} height={250} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={40} width={270} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={25} width={100} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={50} width={130} sx={{ marginLeft: 1 }} />
                        </Card>
                        <Card sx={{ minWidth: 300, maxWidth: 345, margin: 2, padding: 4 }}>
                            <Skeleton variant="rectangular" width={270} height={250} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={40} width={270} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={25} width={100} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={50} width={130} sx={{ marginLeft: 1 }} />
                        </Card>
                        <Card sx={{ minWidth: 300, maxWidth: 345, margin: 2, padding: 4 }}>
                            <Skeleton variant="rectangular" width={270} height={250} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={40} width={270} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={25} width={100} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={50} width={130} sx={{ marginLeft: 1 }} />
                        </Card>
                        <Card sx={{ minWidth: 300, maxWidth: 345, margin: 2, padding: 4 }}>
                            <Skeleton variant="rectangular" width={270} height={250} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={40} width={270} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={25} width={100} sx={{ marginLeft: 1 }} />
                            <Skeleton variant="text" height={50} width={130} sx={{ marginLeft: 1 }} />
                        </Card>

                    </Box>
                )

                    : (<Container sx={{ marginTop: 2 }}>
                        <Box display={'flex'} alignItems='center' justifyContent={'space-evenly'} flexWrap={'wrap'}>

                            {
                                products && products.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))

                            }
                        </Box>



                    </Container>)
            }

        </>
    )
}

export default ProductContainer