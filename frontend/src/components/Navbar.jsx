import { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import { Avatar, Button, Container, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

import SearchFeature from './SearchFeature';

export default function Navbar() {


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const onLogout = () => {
        dispatch(logout())
    }

    const dispatch = new useDispatch()
    const navigator = useNavigate()
    const { isAuthenticated, user } = useSelector(state => state.user)
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [userAvatar, setUserAvatar] = useState('')

    const linkStyle = {
        textDecoration: 'none',
        color: 'white'
    }
    const linkStyleMobile = {
        textDecoration: 'none',
        color: 'black'
    }


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };




    useEffect(() => {
        if (user) {
            setUserAvatar(user.image)
        }
        if (!isAuthenticated) {
            navigator('/login')
        }

    }, [isAuthenticated, navigator, user])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
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
                                    <Link to='/cart' style={linkStyleMobile}>
                                        <Typography textalign="center">
                                            Cart
                                        </Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textalign="center">
                                        <Link to='/register' style={linkStyleMobile}>Previous Cart</Link>
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>



                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>


                            <Link to="/cart" style={linkStyle}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Cart
                                </Button>

                            </Link>
                            <Button

                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link to="/register" style={linkStyle}>Previous Cart</Link>
                            </Button>
                        </Box>

                        {/* SEARCH FUNCTION */}
                        <SearchFeature />

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="User" sx={{ marginLeft: 2, width: { xs: 40, md: 50 }, height: { xs: 40, md: 50 } }} src={userAvatar} />
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
                                <Link to="/myProfile" textalign="center" style={{ color: 'black', textDecoration: 'none' }} >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        Profile
                                    </MenuItem>
                                </Link>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Typography textalign="center" onClick={onLogout}>Logout</Typography>
                                </MenuItem>

                            </Menu>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
            {/* {renderMobileMenu} */}
            {/* {renderMenu} */}
        </Box>
    );
}
