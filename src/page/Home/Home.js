import React from 'react';
import {
    getTechnicalAchievementCount,
    getUserActiveCount,
} from "../../tools/Network";
import SmallDataCard from "../../admin/Main/components/SmallDataCard/SmallDataCard";
import AchievementList from "./components/AchievementList/AchievementList";
import {
    useTranslation,
} from "react-i18next";
import {
    useHistory,
} from "react-router-dom";
import {
    Card,
    CardHeader,
    makeStyles,
    Grid,
} from "@material-ui/core";

export default function Home({notice, loading, setLoading}) {
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
                        fetch={getTechnicalAchievementCount}
                        notice={notice}
                    />
                </Grid>
                <Grid
                    item
                    xs={3}
                >
                    <SmallDataCard
                        title={'技术需求'}
                        fetch={getUserActiveCount}
                        notice={notice}
                    />
                </Grid>
                <Grid
                    item
                    xs={3}
                >
                    <SmallDataCard
                        title={'在线合作'}
                        fetch={getUserActiveCount}
                        notice={notice}
                    />
                </Grid>
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
    icon: {
        height: 32,
        width: 32,
        margin: '5px auto',
    },
}));
