import React from 'react';
import Destacados from '../../Destacados'
import Bar from '../../Bar';
import Grid from '@material-ui/core/Grid';
import Products from '../../ProductsName'

const Home = () => {
    return (
        <div>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >   
                <Products />
            </Grid>
        </div>
    )

}

export default Home;