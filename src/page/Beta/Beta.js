import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../i18N"

import {useHistory, useLocation} from "react-router-dom";

import {fetchGet, fetchStatusAlert} from "../../tools/Network";

import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Vx from "./Vx/Vx";

export default function Beta({notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();

    return (
        <div className={classes.center}>
            <Typography variant="h3" align="center">{t("实验场")}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="inherit" align="center">{t("Vx")}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Vx width={1000}
                        height={500}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20
                        }}/>
                </Grid>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    center: {
        display: 'block',
        margin: '5px auto',
    },
}));