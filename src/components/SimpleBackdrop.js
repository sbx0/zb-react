import React, {useEffect} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';

export default function SimpleBackdrop(props) {
    const classes = useStyles();

    useEffect(() => {
    }, [props.loading]);

    return (
        <div>
            <Backdrop className={classes.backdrop} open={props.loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));