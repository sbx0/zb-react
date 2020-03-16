import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import "../../i18N/"
import {
    Link as RouterLink, useHistory,
    useParams
} from "react-router-dom";
import {fetchStatus, fetchStatusAlert, getTechnicalAchievementOne} from "../../tools/Network";
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
import {Link} from "@material-ui/core";

export default function TechnicalAchievementsOne({setLoading, notice}) {
    let history = useHistory();
    const classes = useStyles();
    const {t} = useTranslation();
    let {id} = useParams();
    const [object, setObject] = useState({
        postTime: new Date()
    });

    useEffect(() => {
        let isCancelled = false;
        setLoading(true);
        getTechnicalAchievementOne(
            {id: id}
        ).then((json) => {
            if (!isCancelled) {
                const status = json['status'];
                if (fetchStatus(status)) {
                    setObject(json["object"]);
                } else {
                    notice(t(fetchStatusAlert(status)), status);
                }
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        }).finally(() => {
            setLoading(false);
        })
        return () => {
            isCancelled = true;
        }
    }, [id]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    onClick={() => {
                        history.push('/market/technical/achievements/userId:' + object['userId'])
                    }}
                >
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
                                <Link
                                    component={RouterLink}
                                    to={'/market/technical/achievements/maturityId:' + object['maturityId']}
                                    color={'textSecondary'}
                                >
                                    {object['maturity'] != null ? object['maturity'] : '加载中'}
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                align="center"
                            >
                                <Link
                                    component={RouterLink}
                                    to={'/market/technical/achievements/cooperationMethodId:' + object['cooperationMethodId']}
                                    color={'textSecondary'}
                                >
                                    {object['cooperationMethod'] != null ? object['cooperationMethod'] : '加载中'}
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper variant={'outlined'} className={classes.paper}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <ReactMarkdown
                                            source={object['context']}
                                            escapeHtml={true}
                                        />
                                    </Grid>
                                </Grid>
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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
    },
    image: {
        margin: '0 auto',
    },
    img: {
        margin: '0 auto',
        display: 'block',
        minWidth: 260,
        maxWidth: '90vw',
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