import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';



export default function RecipeReviewCard({ product }) {


    return (
        <Card sx={{ minWidth: 300, maxWidth: 345, margin: 2 }}>

            <CardMedia
                component="img"
                // height="200"
                sx={{
                    maxWidth: 280
                }}
                image={product.image}
                alt="Cake"
            />
            <CardContent>
                <Typography variant="h6" color="text.primary">
                    {product.name}
                </Typography>
                <Typography variant="h5">
                    ₹<Typography variant="h6" component={'span'}> {product.price} </Typography>
                </Typography>
            </CardContent>


        </Card>
    );
}
