import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, CircularProgress, TextField } from "@mui/material"
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import { loadUser, updateProfile } from '../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../constants/userContstants'
import { Container, Grid, Stack, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';


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
    const [isImgChanged, setIsImgChanged] = useState(false)

    const [avatarPreview, setAvatarPreview] = useState("");
    const [avatar, setAvatar] = useState("")




    const dataChanged = (e) => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);

                setIsImgChanged(true)
            }
        };

        reader.readAsDataURL(e.target.files[0]);

    };
    const openFile = () => {
        fileInput.current.click();
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.set("username", username)
        formData.set("email", email)
        formData.set("firstname", firstname)
        formData.set("lastname", lastname)
        formData.set("userimage", avatar)
        formData.set("address", address)
        dispatch(updateProfile(formData))

    }

    const fileInput = useRef(null);

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
                    (
                        <Box sx={{ height: '93vh', width: '100%', display: 'grid', placeItems: 'center' }}>

                            <CircularProgress color="inherit" />
                        </Box>
                    ) :

                    (
                        <>

                            <Navbar />


                            <form onSubmit={handleOnSubmit} encType="multipart/form-data" >
                                <Container sx={{ mt: 2 }}>
                                    <Grid container display={"flex"} p={2} sx={{ gap: 3, flexDirection: { xs: 'column', md: 'row' } }} borderRadius={2}>

                                        <Grid item flex="4" border="1px solid white" boxShadow={'4px 4px 10px gray'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>


                                            <Avatar src={isImgChanged ? avatarPreview : image} alt="User" loading="lazy" style={{ width: '150px', height: '150px', borderRadius: '999px', textalign: "center" }} />
                                            <input type="file" name="userimage" ref={fileInput} onChange={dataChanged} accept="images/*" style={{ display: 'none' }} />

                                            <EditIcon onClick={openFile} style={{ cursor: 'pointer', transform: 'translateX(250%) translateY(-50%)' }} />


                                            <TextField name="username" value={username} sx={{ marginBottom: 2 }} variant="standard" onChange={(e) => setUsername(e.target.value)} />
                                        </Grid>

                                        <Grid item flex="8" boxShadow={'4px 4px 10px gray'} sx={{ padding: { xs: 2, sm: 4 } }} borderRadius={2}>

                                            <Typography sx={{ fontSize: { xs: '20px', md: '25px' } }} mb={2} color={headingColor}>Edit Profile: </Typography>

                                            <Stack spacing={2} >

                                                <Stack direction={'row'} spacing={2} sx={{ display: 'flex' }}>
                                                    <Typography variant='subtitle1' sx={{ flex: .4 }}>Email: </Typography>


                                                    <TextField name="email" value={email} variant="standard" onChange={(e) => setEmail(e.target.value)} />


                                                </Stack>
                                                <Stack direction={'row'} spacing={2} sx={{ display: 'flex' }}>
                                                    <Typography variant='subtitle1' sx={{ flex: .4 }}>Firstname: </Typography>
                                                    <TextField name="firstname" value={firstname} variant="standard" onChange={(e) => setFirstname(e.target.value)} />

                                                </Stack>
                                                <Stack direction={'row'} spacing={2} sx={{ display: 'flex' }}>
                                                    <Typography variant='subtitle1' sx={{ flex: .4 }}>Lastname: </Typography>
                                                    <TextField name="lastname" value={lastname} variant="standard" onChange={(e) => setLastname(e.target.value)} />


                                                </Stack>
                                                <Stack direction={'row'} spacing={2} sx={{ display: 'flex' }}>
                                                    <Typography variant='subtitle1' sx={{ flex: .4 }}>Address: </Typography>
                                                    <TextField name="address" value={address} variant="standard" onChange={(e) => setAddress(e.target.value)} />

                                                </Stack>




                                                <Stack>
                                                    <Box display='flex' justifyContent='flex-end'>

                                                        <Button type="submit" variant='contained'>
                                                            Edit
                                                        </Button>
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </form>
                        </>
                    )
            }
        </>


    )
}

export default MyProfile