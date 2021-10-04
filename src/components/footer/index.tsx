import React from 'react';
import { Grid, Link, Typography } from "@mui/material";


const Footer = () => {
    return (
        <Grid container spacing={2} sx={{ marginTop: 8, marginBottom: 4 }}>
            <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary" align="center">
                    <Link
                        color="inherit"
                        target="_blank"
                        href="https://github.com/paulvollmer/postmortem.report/issues/new?title=Short%20bug%20description&body=detailed%20description%20of%20the%20bug&labels=bug"
                    >
                        Found a Bug
                    </Link>
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary" align="center">
                    <Link
                        color="inherit"
                        target="_blank"
                        href="https://github.com/paulvollmer/postmortem.report/issues"
                    >
                        Fork the Code
                    </Link>
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary" align="center">
                    <Link
                        color="inherit"
                        target="_blank"
                        href="https://github.com/paulvollmer/postmortem.report/issues/new?title=Short%20feature%20description&body=detailed%20description%20of%20the%20feature%20request&labels=feature"
                    >
                        Send a Feature Request
                    </Link>
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Copyright © '}
                    <Link
                        color="inherit"
                        target="_blank"
                        href="https://paulvollmer.net/"
                    >
                        Paul Vollmer
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Footer
