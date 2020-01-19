import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import {makeStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import ScrollableTabsButtonAuto from "./TabPanel";
import PropTypes from "prop-types";
import DemandList from "./DemandList";

Home.propTypes = {
    setMsg: PropTypes.func,
};

function Home(props) {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Skeleton variant="rect" width="70wh" height="20vh" className={classes.center}/>
            <DemandList setMsg={props.setMsg}/>
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '5px 8px',
        margin: '0px auto',
    },
    center: {
        margin: '5px auto',
    }
}));

export default Home;
