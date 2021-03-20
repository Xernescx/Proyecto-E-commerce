import React from 'react';
import Grid from '@material-ui/core/Grid';
import Products from '../../Products'


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