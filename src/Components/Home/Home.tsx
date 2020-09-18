import React from 'react';
import Grid from '@material-ui/core/Grid';

const Home = (): JSX.Element => {
    return (
        <>
            <Grid container item>
                <Grid item>
                    Home
                </Grid>
            </Grid>
            <Grid container item>
                <div>
                    <Grid container item>
                        Test
                    </Grid>
                </div>
            </Grid>
        </>
    );
};

export default Home;
