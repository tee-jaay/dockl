import React from 'react'
import { Card, Divider, Paper, Typography } from '@mui/material'

const ComponentHeader = ({ title }) => {
    return (

        <>
            <Card component={Paper} sx={{ padding: '8px' }}>
                <Typography>Command: {title}</Typography>
            </Card>
            <Divider />
        </>
    )
}

export default ComponentHeader