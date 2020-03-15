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
import SchoolIcon from '@material-ui/icons/School';
import BusinessIcon from '@material-ui/icons/Business';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';

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
                        icon={<SchoolIcon className={classes.icon}/>}
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
                        icon={<BusinessIcon className={classes.icon}/>}
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
                        icon={<GroupIcon className={classes.icon}/>}
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
                        icon={<PersonIcon className={classes.icon}/>}
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

export default Home;
