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

import SmallDataCard from "./components/SmallDataCard/SmallDataCard";
import Button from "@material-ui/core/Button";
import SchoolIcon from "@material-ui/icons/School";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import TableChartIcon from "@material-ui/icons/TableChart";
import {Card, CardContent, CardHeader, Divider} from "@material-ui/core";
import LineChart from "../../page/Home/components/LineChart";
import PieChart from "../../page/Home/components/PieChart";

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
                    <Grid
                        container
                        spacing={4}
                    >
                        <Grid
                            item
                            xs={3}
                        >
                            <SmallDataCard
                                title={'在线人数'}
                                url={'user/base/active'}
                                notice={notice}
                                setLoading={setLoading}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<VerifiedUserIcon/>}
                                onClick={() => {
                                    history.push("/admin/review")
                                }}
                                fullWidth
                                size="large"
                            >
                                {t("认证审核")}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<TableChartIcon/>}
                                onClick={() => {
                                    history.push("/admin/table")
                                }}
                                fullWidth
                                size="large"
                            >
                                {t("通用后台管理")}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={1}
                    >
                        <Grid item sm={6} xs={12}>
                            <Card>
                                <CardHeader
                                    subheader={t("每天更新")}
                                    title={t("技术成果数")}
                                />
                                <Divider/>
                                <CardContent>
                                    <LineChart
                                        notice={notice}
                                        day={30}
                                        kind="technicalAchievementsCount"
                                        group="per_day"
                                        referenceValue={0}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Card>
                                <CardHeader
                                    subheader={t("每小时更新")}
                                    title={t("访问量")}
                                />
                                <Divider/>
                                <CardContent>
                                    <LineChart
                                        notice={notice}
                                        day={30}
                                        kind="view"
                                        group="per_hour"
                                        referenceValue={0}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Card>
                                <CardHeader
                                    subheader={t("每小时更新")}
                                    title={t("活跃数")}
                                />
                                <Divider/>
                                <CardContent>
                                    <LineChart
                                        notice={notice}
                                        day={30}
                                        kind="active"
                                        group="per_hour"
                                        referenceValue={0}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Card>
                                <CardHeader
                                    subheader={t("统计访问用户所使用的客户端")}
                                    title={t("终端")}
                                />
                                <Divider/>
                                <CardContent>
                                    <PieChart
                                        notice={notice}
                                        day={30}
                                        kind="active"
                                        group="per_hour"
                                        referenceValue={0}
                                    />
                                </CardContent>
                            </Card>
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
