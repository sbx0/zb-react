import React from 'react';

import {makeStyles} from "@material-ui/core";
import DataVisualization from "./components/DataVisualization/DataVisualization";
import Typography from "@material-ui/core/Typography";
import {useTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";

function Home({notice, setLoading}) {
    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                    <Typography variant="inherit" align="center">{t("访问量")}</Typography>
                    <DataVisualization notice={notice} day={30} kind="view" group="per_hour" referenceValue={0}/>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Typography variant="inherit" align="center">{t("活跃数")}</Typography>
                    <DataVisualization notice={notice} day={30} kind="active" group="per_hour" referenceValue={0}/>
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
