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
import Box from "@material-ui/core/Box";

export default function Footer() {
    const {t} = useTranslation();
    const classes = useStyles();
    let history = useHistory();

    return (
        <Box>
            <Divider variant="middle" className={classes.divider}/>
            <Grid
                container
                justify="center"
                alignItems="center"
                align="center"
                className={classes.divider}
            >
                <Typography variant="caption" display="block" color="textSecondary">
                    {t("智贝")} 2019 - 2020<br/>
                    {t("版本")} {global.dev_version}<br/>
                    Power By React<br/>
                    <LanguageSelect/>
                </Typography>
            </Grid>
        </Box>
    );
}

const useStyles = makeStyles(() => ({
    divider: {
        marginTop: 10,
    },
}));