import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import DemandList from "./DemandList";

Home.propTypes = {
    setMsg: PropTypes.func,
};

function Home(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            {/*<Skeleton variant="rect" width="70wh" height="20vh" className={classes.center}/>*/}
            <DemandList setMsg={props.setMsg} setLoading={props.setLoading}/>
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
