import * as React from 'react';
import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router"
import { logout } from '../actions/userActions';
// import {

//     Link

// } from "react-router-dom";
const Navbar = () => {
    const dispatch = new useDispatch()
    const navigator = useNavigate()
    const { isAuthenticated, user } = useSelector(state => state.user)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [userAvatar, setUserAvatar] = useState('')

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const linkStyle = {
        textDecoration: 'none',
        color: 'white'
    }
    const linkStyleMobile = {
        textDecoration: 'none',
        color: 'black'
    }
    const onLogout = () => {
        dispatch(logout())
    }

    useEffect(() => {
        if (user) {
            setUserAvatar(user.image)
        }
        if (!isAuthenticated) {
            navigator('/login')
        }

    }, [isAuthenticated, navigator, user])



    return (
        <AppBar position="static" style={{ backgroundColor: "orange" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <Link to="/" style={linkStyle}>MissMuffin</Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link to='/login' style={linkStyleMobile}>Cart</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link to='/register' style={linkStyleMobile}>Previous Cart</Link>
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <Link to="/" style={linkStyle}>MissMuffin</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link to="/login" style={linkStyle}>Cart</Link>
                        </Button>
                        <Button

                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link to="/register" style={linkStyle}>Previous Cart</Link>
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User" sx={{ width: 50, height: 50 }} src={userAvatar} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Link to="/myProfile" textAlign="center" style={{ color: 'black', textDecoration: 'none' }} >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    Profile
                                </MenuItem>
                            </Link>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" onClick={onLogout}>Logout</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
