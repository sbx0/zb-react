import React, {useState} from 'react';

import {useTranslation} from 'react-i18next';
import "../../i18N/i18N"

import {
    Switch,
    Route,
    useRouteMatch,
    useHistory
} from "react-router-dom";


import {makeStyles} from '@material-ui/core/styles';
import {useMediaQuery, useTheme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SchoolIcon from "@material-ui/icons/School";
import BusinessIcon from "@material-ui/icons/Business";

export default function Post({notice, setLoading}) {
    const {t} = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    let history = useHistory();
    let match = useRouteMatch();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
        <div className={classes.container}>
            <Grid container spacing={5} className={classes.mt}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SchoolIcon/>}
                        onClick={() => {
                            history.push("/post/technical/achievements")
                        }}
                        fullWidth
                        size="large"
                    >
                        {t("发布技术成果")}
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<BusinessIcon/>}
                        fullWidth
                        size="large"
                        disabled
                    >
                        {t("发布技术需求")}
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0px auto',
    },
    center: {
        margin: '0px auto',
    },
    mt: {
        marginTop: 20
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
