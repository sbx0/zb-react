import React from 'react';
import {useTranslation} from 'react-i18next';
import {Switch, Route, useRouteMatch, useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import {
    VerifiedUser as VerifiedUserIcon,
    TableChart as TableChartIcon,
} from "@material-ui/icons";
import {
    Grid,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Button,
} from '@material-ui/core';
import {getUserActiveCount} from "../../tools/Network";
import Review from "../Review"
import SmallDataCard from "./components/SmallDataCard/SmallDataCard";
import LineChart from "../../page/Home/components/LineChart";
import PieChart from "../../page/Home/components/PieChart";

export default function Main({notice}) {
    const {t} = useTranslation();
    const classes = useStyles();
    let history = useHistory();
    let match = useRouteMatch();

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
                                fetch={getUserActiveCount}
                                notice={notice}
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
                                {t("后台管理")}
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
