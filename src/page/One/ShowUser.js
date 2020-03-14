import React, {useState, useEffect} from 'react';
import "../../i18N"
import {fetchGet, fetchStatus, fetchStatusAlert} from "../../tools/Network";
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {Divider, Link, ListItem, ListItemText} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

export default function ShowUser({id, notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const [objects, setObjects] = useState([]);
    const [object, setObject] = useState({});

    useEffect(() => {
        if (id !== undefined) {
            let url = 'user/base/show?id=' + id;
            fetchGet(
                url
            ).then((json) => {
                const status = json['status'];
                if (fetchStatus(status)) {
                    if (json['object']['avatar'] !== 'avatar.jpg') {
                        json['object']['avatar'] = localStorage.getItem("server_config") + json['object']['avatar'];
                    }
                    setObject(json['object']);
                } else {
                    notice(t(fetchStatusAlert(status)), status);
                }
            }).catch((error) => {
                notice(error.toString(), -1);
            }).finally(() => {

            })
        }
    }, [id]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Avatar
                    src={object['avatar']}
                />
                <Typography variant={'inherit'}>
                    {object['name']}
                </Typography>
            </Grid>
            <Grid item xs={6}>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles(theme => ({}));