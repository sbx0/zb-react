import React, {useState} from 'react';

import {useTranslation} from 'react-i18next';
import "../../i18N"

import {
    Switch,
    Route,
    useRouteMatch,
    useHistory
} from "react-router-dom";

import Review from "../Review"


import {makeStyles} from '@material-ui/core/styles';
import {useMediaQuery, useTheme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function Main({notice, setLoading}) {
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
            <Switch>
                <Route path={`${match.path}/review`}>
                    <Review/>
                </Route>
                <Route path={match.path}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Paper
                                className={classes.paper}
                                onClick={() => {
                                    history.push("/admin/review")
                                }}
                            >
                                待审核 33
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>今日访问量</Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>今日成交量</Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.paper}>环比</Paper>
                        </Grid>
                    </Grid>
                </Route>
            </Switch>
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
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default Main;
