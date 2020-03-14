import React from 'react';

import {
    LineChart,
    PieChart,
} from "./components"
import {Card, CardContent, CardHeader, Divider, makeStyles} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import {useHistory} from "react-router-dom";
import SmallDataCard from "../../admin/Main/components/SmallDataCard/SmallDataCard";
import ShowCard from "./components/ShowCard/ShowCard";
import AchievementList from "./components/AchievementList/AchievementList";
import ButtonBase from "@material-ui/core/ButtonBase";

function Home({notice, loading, setLoading}) {
    const {t} = useTranslation();
    let history = useHistory();
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Grid container spacing={1}>
                <Grid
                    item
                    xs={3}
                    onClick={() => {
                        history.push('/market/technical/achievements')
                    }}
                >
                    <SmallDataCard
                        title={'技术成果'}
                        url={'technical/achievements/count'}
                        notice={notice}
                        setLoading={setLoading}
                    />
                </Grid>
                <Grid
                    item
                    xs={3}
                >
                    <SmallDataCard
                        title={'技术需求'}
                        url={'user/base/active'}
                        notice={notice}
                        setLoading={setLoading}
                    />
                </Grid>
                <Grid
                    item
                    xs={3}
                >
                    <SmallDataCard
                        title={'在线合作'}
                        url={'user/base/active'}
                        notice={notice}
                        setLoading={setLoading}
                    />
                </Grid>
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
                <Grid item xs={12}>
                    <AchievementList
                        notice={notice}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Card
                        onClick={() => {
                            history.push('/chat/public')
                        }}
                    >
                        <CardHeader
                            subheader={t('实时聊天')}
                            title={t('前往公共聊天室')}
                        />
                    </Card>
                </Grid>
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
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0px auto',
    },
    center: {
        margin: '0px auto',
    }
}));

export default Home;
