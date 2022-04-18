import React, { useEffect, useState } from 'react'
import { Button, CircularProgress } from "@mui/material"
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField';
import { loadUser, updateProfile } from '../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../constants/userContstants'


const MyProfile = () => {
    const dispatch = useDispatch()
    const { isAuthenticated, user } = useSelector(state => state.user)
    const { isUpdated, error, loading } = useSelector(state => state.profile)
    const history = useNavigate()


    const [username, setUsername] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [address, setAddress] = useState()




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
        formData.set("firstname", firstName)
        formData.set("lastname", lastName)

        // console.log(formData)
        dispatch(updateProfile(formData))


    }
    useEffect(() => {
        if (!isAuthenticated) {
            history('/login')
        }
        if (user) {
            setUsername(user.username)
            setFirstName(user.firstname)
            setLastName(user.lastname)
            setAddress(user.address)
            setEmail(user.email)
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
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh' }}>
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
                            </Box>
                        </>
                    )
            }
        </>


    )
}

export default MyProfile