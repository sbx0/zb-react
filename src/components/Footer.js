import React from 'react';

import i18N from '../i18N/i18N_zh_CN';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.div}>
            <Divider variant="middle"/>
            <Grid
                container
                justify="center"
                alignItems="center"
                align="center"
                className={classes.divider}
            >
                <Typography variant="caption" gutterBottom display="block" color="textSecondary">
                    智贝 2019 - 2020<br/>
                    版本 {i18N.dev_version}<br/>
                    Power By React<br/>
                </Typography>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles(() => ({
    div: {
        flexGrow: 1,
        margin: 10,
    },
    center: {
        paddingTop: 10,
    },
    divider: {
        marginTop: 10,
    },
}));