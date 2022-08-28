import React from 'react'
import { Alert } from '@mui/material'
import Layout from '../../layouts/Layout'

const NotFound = () => {
    return (
        <Layout>
            <Alert severity='error'>Not Found</Alert>
        </Layout>
    )
}

export default NotFound