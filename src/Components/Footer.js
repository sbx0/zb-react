import React from 'react';

import {useTranslation} from 'react-i18next';
import "../i18N"
import {useHistory, Link} from "react-router-dom";

import LanguageSelect from "./LanguageSelect";
import global from '../tools/Global';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

export default function Footer() {
    const {t} = useTranslation();
    const classes = useStyles();
    let history = useHistory();

    return (
        <div className={classes.div}>
            <Button
                type="button"
                fullWidth
                variant="outlined"
                className={classes.divider}
                onClick={() => history.goBack()}
            >
                {t("返回")}
            </Button>
            <Divider variant="middle"/>
            <Grid
                container
                justify="center"
                alignItems="center"
                align="center"
                className={classes.divider}
            >
                <Typography variant="caption" gutterBottom display="block" color="textSecondary">
                    {t("智贝")} 2019 - 2020<br/>
                    {t("版本")} {global.dev_version}<br/>
                    Power By React<br/>
                    <LanguageSelect/>
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
        marginBottom: 10,
    },
}));