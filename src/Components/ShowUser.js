import React, {useEffect, useState} from 'react';
import "../i18N"
import {makeStyles} from '@material-ui/core/styles';
import {fetchStatus, fetchStatusAlert, getUserBaseShow} from "../tools/Network";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";

export default function ShowUser({id, notice, loadActive, data}) {
    const classes = useStyles();
    const [user, setUser] = useState(data);

    useEffect(() => {
        if (data == null) {
            let url = 'user/base/show?id=' + id;
            getUserBaseShow({
                id: id
            }).then((json) => {
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
        {
            data == null ?
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
                :
                <Chip
                    variant="outlined"
                    avatar={
                        <Avatar
                            className={classes.avatar}
                            src={
                                data['avatar'] === 'avatar.jpg' ?
                                    data['avatar']
                                    :
                                    localStorage.getItem("server_config") + data['avatar']
                            }
                        />
                    }
                    label={data?.name}
                />
        }
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