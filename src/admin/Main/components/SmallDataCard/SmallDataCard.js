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
import ButtonBase from "@material-ui/core/ButtonBase";

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
            <Grid
                container
                justify="center"
                alignContent={'center'}
                spacing={0}
            >
                <Grid item xs={12}>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                        align={'center'}
                        className={classes.fullWidth}
                    >
                        {t(title)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        color="textPrimary"
                        variant="h5"
                        align={'center'}
                        className={classes.fullWidth}
                    >
                        {data}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}

const useStyles = makeStyles(theme => ({
    fullWidth: {
        dispaly: 'block',
        width: '100%'
    }
}));