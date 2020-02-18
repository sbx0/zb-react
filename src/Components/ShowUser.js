import React, {useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import "../i18N"
import {useHistory, Link} from "react-router-dom";

import LanguageSelect from "./LanguageSelect";
import global from '../tools/Global';

import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {fetchGet, fetchStatus, fetchStatusAlert} from "../tools/Network";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

export default function ShowUser({id, notice, data}) {
    const classes = useStyles();
    const [user, setUser] = useState(data);

    useEffect(() => {
        if (data == null) {
            let url = 'user/base/show?id=' + id;
            fetchGet(
                url
            ).then((json) => {
                const status = json['status'];
                if (fetchStatus(status)) {
                    const object = json['object'];
                    if (object['avatar'] !== 'avatar.jpg') {
                        object['avatar'] = localStorage.getItem("server_config") + object['avatar'];
                    }
                    setUser(object)
                } else {
                    notice(t(fetchStatusAlert(status)), status);
                    setUser(null);
                }
            }).catch((error) => {
                notice(error.toString(), -1);
            });
        }
    }, []);

    return <>
        <Chip
            variant="outlined"
            avatar={
                <Avatar
                    className={classes.avatar}
                    src={user?.avatar}
                />
            }
            label={user?.name}
        />
    </>;
}

const useStyles = makeStyles(() => ({
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