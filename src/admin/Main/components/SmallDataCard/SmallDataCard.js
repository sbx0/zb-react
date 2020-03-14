import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../../../i18N"

import {useHistory, useLocation} from "react-router-dom";

import {fetchGet, fetchStatus, fetchStatusAlert} from "../../../../tools/Network";

import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {ArrowDownward, Money} from "@material-ui/icons";
import Card from "@material-ui/core/Card";
import Badge from '@material-ui/core/Badge';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

export default function SmallDataCard({icon, title, url, notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const [data, setData] = useState(0);

    useEffect(() => {
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                setData(json['object']);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
    }, []);

    return (
        <Card>
            <CardContent>
                <Grid
                    container
                    justify="space-between"
                    alignContent={'center'}
                >
                    <Grid item>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                            variant="body2"
                        >
                            {t(title)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <div className={classes.paper}>
                            <Badge
                                badgeContent={data}
                                color="default"
                            >
                                <Avatar className={classes.avatar}>
                                    {icon}
                                </Avatar>
                            </Badge>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        height: '100%'
    },
    content: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontWeight: 700
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
        height: 55,
        width: 55
    },
    icon: {
        height: 42,
        width: 42
    },
    difference: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center'
    },
    differenceIcon: {
        color: theme.palette.error.dark
    },
    differenceValue: {
        color: theme.palette.error.dark,
        marginRight: theme.spacing(1)
    }
}));