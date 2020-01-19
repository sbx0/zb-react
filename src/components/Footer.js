import React from 'react';

import i18N from '../i18N/i18N_zh_CN';

import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.div}>
            <Divider variant="middle"/>
            <Typography align="center" className={classes.center}>
                <Link
                    href={i18N.server_config + 'login.html'}
                >
                    登录
                </Link >
            </Typography>
            <Grid
                container
                justify="center"
                alignItems="center"
                align="center"
                className={classes.divider}
            >
                <Typography variant="caption" gutterBottom display="block">
                    智贝 2020 {i18N.version}{i18N.dev_version}<br/>
                    Power By React
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