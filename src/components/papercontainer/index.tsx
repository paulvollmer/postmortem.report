import React from 'react';
import { Grid, Typography, Paper } from "@mui/material";

type PaperContainerProps = {
    title: string;
    children: any;
}

const PaperContainer = (props: PaperContainerProps) => {
    return (
        <Paper sx={{ my: { xs: 3 }, p: { xs: 2 } }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">{props.title}</Typography>
                </Grid>
                {props.children}
            </Grid>
        </Paper>
    )
}

export default PaperContainer