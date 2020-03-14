import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../i18N/"

import {
    useParams
} from "react-router-dom";

import {fetchGet, fetchStatus, fetchStatusAlert} from "../../tools/Network";

import ReactMarkdown from "react-markdown";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import ShowAddress from "./ShowAddress";
import Paper from "@material-ui/core/Paper";
import ShowClassification from "./ShowClassification";
import Divider from "@material-ui/core/Divider";
import tools from "../../tools/Utils";
import ShowUser from "./ShowUser";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        margin: '0 auto',
    },
    img: {
        margin: '0 auto',
        display: 'block',
        minWidth: 370,
        maxHeight: 120,
        objectFit: 'cover',
    },
    mt: {
        marginTop: '10px'
    },
    mb: {
        marginBottom: '10px'
    }
}));

export default function TechnicalAchievementsOne({setLoading, notice}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let {id} = useParams();
    const [object, setObject] = useState({
        postTime: new Date()
    });

    useEffect(() => {
        let url = 'technical/achievements/one?id=' + id;
        setLoading(true);
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                setObject(json["object"]);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        }).finally(() => {
            setLoading(false);
        })
    }, [id]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ShowUser
                        id={object['userId']}
                        notice={notice}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <ShowClassification
                                id={object['classificationId']}
                                notice={notice}
                                setLoading={setLoading}
                            />
                            <Divider className={classes.mt}/>
                        </Grid>
                        <Grid item className={classes.image}>
                            <ButtonBase>
                                <img className={classes.img} alt="complex" src={object['cover']}/>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                variant="h5"
                                color="textSecondary"
                                align="center"
                            >
                                {object['name']}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                align="center"
                            >

                                {tools.timeShow(object['postTime'])}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                align="center"
                            >
                                {object['price'] + t("￥")}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                align="center"
                            >
                                {object['maturity']}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                align="center"
                            >
                                {object['cooperationMethod']}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <ReactMarkdown
                                    source={object['context']}
                                    escapeHtml={true}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider className={classes.mb}/>
                            <ShowAddress
                                id={object['addressId']}
                                notice={notice}
                                setLoading={setLoading}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}