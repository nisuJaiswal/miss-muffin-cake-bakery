import React from 'react'
import { Box, Card, Skeleton } from '@mui/material'

const SkeletonCards = () => {
    return (
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
}

export default SkeletonCards