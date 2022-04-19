import { Avatar, Button, CircularProgress, Container, Grid, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { indigo } from '@mui/material/colors';




const MyProfile = () => {

  const headingColor = indigo[600];
  const [username, setUsername] = useState()
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [address, setAddress] = useState()
  const [email, setEmail] = useState()
  const [image, setImage] = useState()


  const { isAuthenticated, loading, user } = useSelector(state => state.user)

  const navigator = useNavigate()


  useEffect(() => {
    if (!isAuthenticated) {
      navigator('/login')
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
  }, [isAuthenticated, navigator, user])


  return (

    <>
      {
        loading ? ((<CircularProgress color="inherit" />)) :
          (
            <>
              <Navbar />
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
                    <Typography sx={{ fontSize: { xs: '20px', md: '25px' } }} mb={2} color={headingColor}>My Profile: </Typography>
                    <Stack spacing={2} >

                      <Stack direction={'row'} spacing={2} sx={{ display: 'flex' }}>
                        <Typography variant='subtitle1' sx={{ flex: .4 }}>Email: </Typography>
                        <Typography variant='subtitle1 sx={{ flex: .6 }}' sx={{ display: 'flex', alignItems: 'flex-start' }}>{email}</Typography>
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
                            <Button variant='contained'>
                              Edit
                            </Button>
                          </Link>
                        </Box>
                      </Stack>
                    </Stack>
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