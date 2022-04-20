import * as React from 'react';
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { Alert } from '@mui/material';
import { TextField, Button } from '@mui/material'
import { clearErrors, login, register } from '../actions/userActions';
import { useNavigate } from "react-router"
import { CircularProgress } from "@mui/material"
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    const history = useNavigate()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const dispatch = useDispatch();
    const { error, loading, isAuthenticated } = useSelector((state) => state.user)

    const [isError, setIsError] = useState(false)
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [avatar, setAvatar] = useState("/DefaultUser.png")
    const [avatarPreview, setAvatarPreview] = useState("/DefaultUser.png");
    const [isImgChanged, setIsImgChanged] = useState(false)
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        firstname: '',
        lastname: ''
    })
    const { username, email, password, firstname, lastname } = user
    const fileInput = useRef(null);

    const openFile = () => {
        fileInput.current.click();
    }
    const dataChanged = (e) => {
        if (e.target.name === "userimage") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);

                    setIsImgChanged(true)
                }
            };

            reader.readAsDataURL(e.target.files[0]);

        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }

    };
    const registrationSubmit = (e) => {
        e.preventDefault();
        // ("Registered")
        const formData = new FormData();

        formData.set("username", username)
        formData.set("email", email)
        formData.set("password", password)
        formData.set("firstname", firstname)
        formData.set("lastname", lastname)
        formData.set("userimage", avatar)
        dispatch(register(formData))


    }
    const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))
    }
    useEffect(() => {
        if (error === "User not loged in") {
            setIsError(false)
            setTimeout(() => {
                dispatch(clearErrors())
            }, 3000);
        }
        else if (error) {
            setIsError(true)
        }
        else {
            setIsError(false)
        }
        // ("From Login", isAuthenticated)
        if (isAuthenticated) {
            history('/')
        }
    }, [dispatch, error, history, isAuthenticated])

    return (

        <Box sx={{
            marginTop: '1.8rem', height: '90vh', width: 'full', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }} component='div'>

            {loading ? (<CircularProgress color="inherit" />) :
                (
                    <>

                        <Box sx={{ padding: '1rem', boxShadow: '5px 5px 10px gray', width: { xs: 300, sm: 400 } }} >

                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} component='div'>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                                    <Tab label="LOGIN" {...a11yProps(0)} />
                                    <Tab label="REGISTER" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <div>
                                {isError &&
                                    <Alert severity="error" style={{ marginTop: 18 }}>{error}</Alert>
                                }
                            </div>
                            <TabPanel value={value} index={0} component='div'>
                                <Box component='div'>
                                    <form onSubmit={loginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        <TextField required label="Email" variant="standard" value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value) }} />
                                        <TextField required label="Password" variant="standard" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                        <Box mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Button type="submit" variant="contained" >LOG IN</Button>
                                        </Box>
                                    </form>

                                </Box>
                            </TabPanel>
                            <TabPanel value={value} index={1} component='div'>
                                <Box>

                                    <form onSubmit={registrationSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <img src={avatarPreview} alt="User" loading="lazy" style={{ width: '100px', height: '100px', borderRadius: '999px' }} sx={{ textAlign: 'center' }} />
                                            <input type="file" name="userimage" ref={fileInput} onChange={dataChanged} accept="images/*" style={{ display: 'none' }} />
                                            {
                                                !isImgChanged ? (
                                                    <AddIcon onClick={openFile} style={{ cursor: 'pointer', transform: 'translateX(-100%) translateY(180%)' }} />
                                                ) : (

                                                    <EditIcon onClick={openFile} style={{ cursor: 'pointer', transform: 'translateX(-80%) translateY(180%)' }} />
                                                )
                                            }
                                        </Box>

                                        <TextField required value={username} name="username" label="Username" variant="standard" onChange={dataChanged} />
                                        <TextField required value={email} name="email" label="Email" variant="standard" type='email' onChange={dataChanged} />
                                        <TextField required value={password} name="password" label="Password" type="password" variant="standard" onChange={dataChanged} />
                                        <TextField required value={firstname} name="firstname" label="First Name" variant="standard" onChange={dataChanged} />
                                        <TextField required value={lastname} name="lastname" label="Last Name" variant="standard" onChange={dataChanged} />

                                        <Box mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Button type="submit" variant="contained" >REGISTER</Button>
                                        </Box>
                                    </form>
                                </Box>
                            </TabPanel>


                        </Box>
                    </>

                )}

        </Box >
    );

}
