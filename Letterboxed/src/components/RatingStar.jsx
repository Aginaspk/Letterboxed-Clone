import { Stack } from '@mui/material'
import Rating from '@mui/material/Rating';
import React from 'react'


function RatingStar({rating,color}) {
    return (
        <Stack spacing={1} >
            <Rating name="half-rating" defaultValue={rating} precision={0.5} readOnly sx={{color:color || "#556677",fontSize:"16px"}}  max={Math.ceil(rating)} />
        </Stack>
    )
}

export default RatingStar