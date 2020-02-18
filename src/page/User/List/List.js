import React, {useState, useEffect} from 'react';
import "../../../i18N"
import {fetchGet, fetchStatus, fetchStatusAlert} from "../../../tools/Network";
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Badge, Divider, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import ShowUser from "../../../Components/ShowUser";

export default function UserList({notice, setLoading, users}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();

    return <>
        <div className={classes.paper}>
            {
                users.length === 0 ?
                    <>
                        <Grid
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <Typography variant="inherit">{name} {t("暂无结果")}</Typography>
                            </Grid>
                        </Grid>
                    </>
                    :
                    <>
                        {
                            users.map((user) => (
                                <ShowUser key={user.id} data={user} notice={notice}/>
                            ))
                        }
                    </>
            }
        </div>
    </>;
}

const useStyles = makeStyles(theme => ({
    center: {
        display: 'block',
        margin: '5px auto',
    },
    paper: {
        alignItems: 'center',
        textAlign: 'center',
    },
    divider: {
        margin: '10px auto'
    },
    avatar: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
}));