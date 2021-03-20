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
                justify="center"
                alignItems="center"
            >

                <Bar />
                <hr />



                <Destacados />

            </Grid>
        </div>
    )

}

export default Home;