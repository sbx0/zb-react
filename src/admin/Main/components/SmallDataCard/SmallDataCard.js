import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
    Typography,
    Grid,
    Card,
} from '@material-ui/core';

import {fetchStatus, fetchStatusAlert} from "../../../../tools/Network";

export default function SmallDataCard({title, fetch, notice}) {
    const {t} = useTranslation();
    const [data, setData] = useState(0);

    useEffect(() => {
        let isCancelled = false;
        fetch().then((json) => {
            if (!isCancelled) {
                const status = json['status'];
                if (fetchStatus(status)) {
                    setData(json['object']);
                } else {
                    notice(t(fetchStatusAlert(status)), status);
                }
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        }).finally(() => {

        });
        return () => {
            isCancelled = true;
        };
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

                    >
                        {t(title)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        color="textPrimary"
                        variant="h5"
                        align={'center'}
                    >
                        {data}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}