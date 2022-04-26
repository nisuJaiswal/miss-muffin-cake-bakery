import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { getAllProducts } from '../actions/productActions';

const SearchFeature = () => {

    const [search, setSearch] = useState('')
    const [firstTime, setFirstTime] = useState(false)
    const dispatch = new useDispatch();
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        console.log(search)
        dispatch(getAllProducts(search))
    }
    const SearchMUI = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    useEffect(() => {
        setFirstTime(true)
    }, [])

    return (
        <form onSubmit={handleSearchSubmit}>

            <SearchMUI>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setFirstTime(false) }}
                    autoFocus={!firstTime}
                />
            </SearchMUI>
        </form>

    )
}

export default SearchFeature