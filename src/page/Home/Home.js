import React from 'react';

import {
    LineChart,
    PieChart,
} from "./components"
import {Card, CardContent, CardHeader, Divider, makeStyles} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function Home({notice, setLoading}) {
    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                    <Card>
                        <CardHeader
                            subheader={t("每小时更新")}
                            title={t("访问量")}
                        />
                        <Divider/>
                        <CardContent>
                            <LineChart notice={notice} day={30} kind="view" group="per_hour" referenceValue={0}/>
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
                            <LineChart notice={notice} day={30} kind="active" group="per_hour" referenceValue={0}/>
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
                            <PieChart notice={notice} day={30} kind="active" group="per_hour" referenceValue={0}/>
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
        textAlign: 'center',
    },
    center: {
        margin: '0px auto',
    }
}));

export default Home;
