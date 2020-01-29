import React from 'react';

import {makeStyles} from "@material-ui/core";
import DemandList from "./DemandList";

function Home({notice, setLoading}) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {/*<Skeleton variant="rect" width="70wh" height="20vh" className={classes.center}/>*/}
            <DemandList notice={notice} setLoading={setLoading}/>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0px auto',
    },
    center: {
        margin: '0px auto',
    }
}));

export default Home;
