import React from 'react';

import {useTranslation} from 'react-i18next';
import "../../../i18N"

import {makeStyles} from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Typography,
    Divider,
    Button,
    LinearProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {},
    details: {
        display: 'flex'
    },
    avatar: {
        marginLeft: 'auto',
        height: 100,
        width: 100,
        flexShrink: 0,
        flexGrow: 0
    },
    progress: {
        marginTop: theme.spacing(2)
    },
    uploadButton: {
        marginRight: theme.spacing(2)
    }
}));

export default function AccountProfile({data, info}) {
    const {t} = useTranslation();
    const classes = useStyles();

    const user = {
        name: 'Shen Zhi',
        city: 'Los Angeles',
        country: 'USA',
        timezone: 'GTM-7',
        avatar: '/images/avatars/avatar_11.png'
    };

    return (
        <Card>
            <CardContent>
                <div className={classes.details}>
                    <div>
                        <Typography
                            gutterBottom
                            variant="h5"
                        >
                            {data.name}
                        </Typography>
                        <Typography
                            className={classes.locationText}
                            color="textSecondary"
                            variant="body1"
                        >
                            {info.introduction}
                        </Typography>
                        <Typography
                            className={classes.dateText}
                            color="textSecondary"
                            variant="body1"
                        >

                        </Typography>
                    </div>
                    <Avatar
                        className={classes.avatar}
                        src={data.avatar}
                    />
                </div>
                <div className={classes.progress}>
                    <Typography variant="body1">{t("等级")} {info.level} {t("级")}</Typography>
                    <LinearProgress
                        value={info.exp / info.expMax}
                        variant="determinate"
                    />
                </div>
            </CardContent>
            <Divider/>
            <CardActions>
                <Button
                    className={classes.uploadButton}
                    color="primary"
                    variant="text"
                >
                    {t("上传头像")}
                </Button>
                {/*<Button variant="text">Remove picture</Button>*/}
            </CardActions>
        </Card>
    );
};