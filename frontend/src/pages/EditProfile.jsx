import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, TextField } from "@mui/material"
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import { loadUser, updateProfile } from '../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../constants/userContstants'
import { Avatar, Container, Grid, Stack, Typography } from '@mui/material'

import { indigo } from '@mui/material/colors';


const MyProfile = () => {
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector(state => state.user)
    const { isUpdated, error, loading } = useSelector(state => state.profile)
    const history = useNavigate()

    const headingColor = indigo[600];
    const [username, setUsername] = useState()
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [address, setAddress] = useState()
    const [email, setEmail] = useState()
    const [image, setImage] = useState()



    // const handleOnSubmit = (e) => {
    //     e.preventDefault()
    //     const updateUserForm = new FormData();

    //     updateUserForm.set("username", username)
    //     updateUserForm.set("email", email)
    //     updateUserForm.set("firstname", firstName)
    //     updateUserForm.set("lastname", lastName)
    //     dispatch(updateProfile(updateUserForm))
    // }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        // console.log("Registered")
        const formData = new FormData();

        formData.set("username", username)
        formData.set("email", email)
        formData.set("firstname", firstname)
        formData.set("lastname", lastname)

        // console.log(formData)
        dispatch(updateProfile(formData))


    }
    useEffect(() => {
        if (!isAuthenticated) {
            history('/login')
        }
        if (user) {
            const { username, firstname, lastname, address, email, image } = user
            setUsername(username)
            setFirstname(firstname)
            setLastname(lastname)
            setAddress(address)
            setEmail(email)
            setImage(image)
        }
        if (error) {
            console.log("ERROR")
        }

        if (isUpdated) {
            console.log("Profile Updated Successfully");
            dispatch(loadUser());

            history("/");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [isAuthenticated, history, user, isUpdated, dispatch, error])

    return (
        <>
            {
                loading ?
                    (<CircularProgress color="inherit" />) :

                    (
                        <>

                            <Navbar />

                            {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
                                <Box>
                                    <form onSubmit={handleOnSubmit} encType="multipart/form-data" >

                                        <TextField label="Username" name="username" value={username} variant="standard" onChange={(e) => setUsername(e.target.value)} />
                                        <TextField label="Email" name="email" value={email} variant="standard" onChange={(e) => setEmail(e.target.value)} />
                                        <TextField label="Firstname" name="firstname" value={firstName} variant="standard" onChange={(e) => setFirstName(e.target.value)} />
                                        <TextField label="Lastname" name="lastname" value={lastName} variant="standard" onChange={(e) => setLastName(e.target.value)} />
                                        <TextField label="Address" name="address" value={address} variant="standard" onChange={(e) => setAddress(e.target.value)} />

                                        <Button variant="contained" type="submit">Edit</Button>
                                    </form>
                                </Box>
                            </Box> */}

                            <Container fluid sx={{ mt: 2 }}>
                                <Grid container display={"flex"} p={2} sx={{ gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>

                                    <Grid item flex="4" border="1px solid white" boxShadow={'4px 4px 10px gray'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={image}
                                            sx={{ width: 150, height: 150 }}
                                        />
                                        <Typography color={headingColor} sx={{ fontSize: { xs: '22px', md: '25px' } }}>{username}</Typography>
                                    </Grid>

                                    <Grid item flex="8" boxShadow={'4px 4px 10px gray'} px={4} py={2}>
                                        <form onSubmit={handleOnSubmit} encType="multipart/form-data" >

                                            <Typography sx={{ fontSize: { xs: '20px', md: '25px' } }} mb={2} color={headingColor}>Edit Profile: </Typography>

                                            <Stack spacing={2} >

                                                <Stack direction={'row'} spacing={2} sx={{ display: 'flex' }}>
                                                    <Typography variant='subtitle1' sx={{ flex: .4 }}>Email: </Typography>
                                                    {/* <Typography variant='subtitle1 sx={{ flex: .6 }}' sx={{ display: 'flex', alignItems: 'flex-start' }}>{email}</Typography> */}
                                                    <TextField label="Username" name="username" value={username} variant="standard" onChange={(e) => setUsername(e.target.value)} />

                                                </Stack>
                                                <Stack direction={'row'} spacing={2} sx={{ display: 'flex' }}>
                                                    <Typography variant='subtitle1' sx={{ flex: .4 }}>Firstname: </Typography>
                                                    <Typography variant='subtitle1 sx={{ flex: .6 }}'>{firstname}</Typography>
                                                </Stack>
                                                <Stack direction={'row'} spacing={2} sx={{ display: 'flex' }}>
                                                    <Typography variant='subtitle1' sx={{ flex: .4 }}>Lastname: </Typography>
                                                    <Typography variant='subtitle1 sx={{ flex: .6 }}'>{lastname}</Typography>
                                                </Stack>
                                                <Stack direction={'row'} spacing={2} sx={{ display: 'flex' }}>
                                                    <Typography variant='subtitle1' sx={{ flex: .4 }}>Address: </Typography>
                                                    <Typography variant='subtitle1 sx={{ flex: .6 }}'>{address ? address : "Not Specified"}</Typography>
                                                </Stack>




                                                <Stack>
                                                    <Box display='flex' justifyContent='flex-end'>

                                                        <Link to="/editProfile" style={{ color: 'white', textDecoration: 'none' }}>
                                                            <Button type="submit" variant='contained'>
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </form>
                                    </Grid>
                                </Grid>
                            </Container>
                        </>
                    )
            }
        </>


    )
}

export default MyProfile