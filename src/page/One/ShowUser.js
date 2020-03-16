import React, {useState, useEffect} from 'react';
import "../../i18N"
import {fetchStatus, fetchStatusAlert, getUserBaseShow} from "../../tools/Network";
import {useTranslation} from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

export default function ShowUser({id, notice, setLoading}) {
    const {t} = useTranslation();
    const [object, setObject] = useState({});

    useEffect(() => {
        let isCancelled = false;
        if (id !== undefined) {
            getUserBaseShow(
                {id: id}
            ).then((json) => {
                if (!isCancelled) {
                    const status = json['status'];
                    if (fetchStatus(status)) {
                        if (json['object']['avatar'] !== 'avatar.jpg') {
                            json['object']['avatar'] = localStorage.getItem("server_config") + json['object']['avatar'];
                        }
                        setObject(json['object']);
                    } else {
                        notice(t(fetchStatusAlert(status)), status);
                    }
                }
            }).catch((error) => {
                notice(error.toString(), -1);
            }).finally(() => {

            })
        }
        return () => {
            isCancelled = true;
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