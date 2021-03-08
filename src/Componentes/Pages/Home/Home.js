import React from 'react';
import Destacados from '../../Destacados'
import Bar from '../../Bar';
import Grid from '@material-ui/core/Grid';

const Home = () => {
    return (
        <div>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Bar />
                <Destacados />
            </Grid>
        </div>
    )

}

export default Home;