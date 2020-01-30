import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../i18N"

import {useHistory} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

export default function NotFound() {
    const classes = useStyles();
    const {t} = useTranslation();
    let history = useHistory();

    return (
        <div className={classes.center}>
            <Typography variant="h3">{t("404")}</Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.center}
                startIcon={<VerifiedUserIcon/>}
                onClick={() => {
                    history.push("/")
                }}
            >
                {t("首页")}
            </Button>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    center: {
        margin: '5px auto',
        textAlign: 'center',
    },
}));