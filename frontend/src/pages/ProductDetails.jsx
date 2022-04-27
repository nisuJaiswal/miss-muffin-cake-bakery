import styled from '@emotion/styled'
import {
    Avatar,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    IconButton,
    RadioGroup,
    Snackbar,
    Typography
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { blue } from '@mui/material/colors'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import { getItemDetails } from '../actions/productActions'
import Navbar from '../components/Navbar'


const ProductDetails = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { isAuthenticated } = useSelector(state => state.user)
    const { productDetail, loading } = useSelector(state => state.productDetail)
    const { added } = useSelector(state => state.cart)
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
    const [quantity, setQuantity] = useState('300')
    const [open, setOpen] = useState(false)
    const headingColor = blue[900]

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.set('name', name)
        formData.set('description', description)
        formData.set('quantity', quantity)
        formData.set('price', price)
        dispatch(addToCart(productDetail._id))
        setOpen(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>

            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    useEffect(() => {
        if (!isAuthenticated) {
            navigator('/login')
        }


    }, [isAuthenticated, navigator, id, dispatch])

    useEffect(() => {
        dispatch(getItemDetails(id))
        setOpen(false)
    }, [])

    useEffect(() => {
        if (productDetail) {
            const { name, description, price, image } = productDetail
            setName(name)
            setDescription(description)
            setPrice(price)
            setimage(image)
        }
    }, [productDetail])



    const [blueBtnFocus, setBlueBtnFocus] = useState(true)

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
                        <Container sx={{ marginTop: 2 }}>
                            <form onSubmit={handleSubmit}>

                                <Typography variant="h5" pb={1} color={headingColor} mb={2} borderBottom={'1px solid gray'}>
                                    {name}
                                </Typography>
                                <CssBaseline />
                                <Grid container flex="4" display="flex" justifyContent="center" sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                                    <Grid item sx={{ flex: .4, display: 'flex', justifyContent: 'center' }}>
                                        <Avatar src={image} variant='square' sx={{ width: 300, height: 300 }} />
                                    </Grid>

                                    <Grid item display='flex' flex="6" sx={{ gap: 1, flex: .8, flexDirection: 'column' }}>
                                        <Typography variant='h5'>
                                            {name}
                                        </Typography>
                                        <Typography variant='body1'>
                                            {description}
                                        </Typography>
                                        <Typography variant='h5'>
                                            ₹ <span style={{ fontSize: 20 }}> {price} </span>
                                            <span style={{ fontSize: 18 }}>/kg</span>
                                        </Typography>
                                        <Box sx={{ paddingLeft: 1 }}>
                                            <RadioGroup
                                                name="quantity"
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    gap: 2
                                                }}
                                            >
                                                <FormControlLabel value="300" control={<Button variant='outlined'
                                                    // ref={setFocus}
                                                    onClick={(e) => {
                                                        setQuantity(e.target.value)
                                                        setBlueBtnFocus(true)
                                                    }}
                                                    style={blueBtnFocus ? {
                                                        color: 'white',
                                                        background: '#1976D2',
                                                    } : { color: 'blue' }}
                                                    sx=
                                                    {{
                                                        "&:focus": {
                                                            background: '#1976D2',
                                                            color: 'white',
                                                        },

                                                    }} > 300g</Button>} />
                                                {/* {buttonReference.current.focus()} */}
                                                <FormControlLabel value="500"

                                                    control={<Button variant='outlined'
                                                        // ref={setFocus}
                                                        color='secondary'
                                                        onClick={(e) => {
                                                            setQuantity(e.target.value)
                                                            setBlueBtnFocus(false)
                                                        }}
                                                        sx=
                                                        {{
                                                            "&:focus": {
                                                                background: '#aa54b9',
                                                                color: 'white',
                                                            }

                                                        }}>500g</Button>} />
                                                <FormControlLabel value="1" control={<Button
                                                    variant='outlined' color='error'
                                                    onClick={(e) => setQuantity(e.target.value)}
                                                    sx=
                                                    {{
                                                        "&:focus": {
                                                            background: '#dc6464',
                                                            color: 'white',
                                                        }

                                                    }}>1 kg</Button>} />

                                            </RadioGroup>
                                        </Box>
                                        <Box sx={{ marginTop: 1 }}>
                                            <Button variant='contained' type='submit'>
                                                Add to cart
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </form>
                            <Snackbar
                                open={open}
                                autoHideDuration={2000}
                                onClose={handleClose}
                                message="Added to Cart"
                                action={action}
                            />
                        </Container>
                    </>
            }

        </>
    )
}

export default ProductDetails