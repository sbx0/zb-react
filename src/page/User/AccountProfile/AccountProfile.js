import React, {useEffect, useState} from 'react';

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
import UploadAvatar from "../UploadAvatar/UploadAvatar";
import {useHistory} from "react-router-dom";

export default function AccountProfile(
    {
        data,
        info,
        notice,
        active,
        changeActive
    }
) {
    const {t} = useTranslation();
    const classes = useStyles();
    const [isUpload, setIsUpload] = useState(false);
    let history = useHistory();

    useEffect(() => {
        if (data == null) {
            history.push('/login')
        }
    }, [])

    return (
        <Card>
            {
                isUpload ?
                    <CardContent>
                        <UploadAvatar notice={notice} active={active} changeActive={changeActive}/>
                    </CardContent>
                    :
                    <CardContent>
                        <div className={classes.details}>
                            <div>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                >
                                    {data != null ? data.name : ''}
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
                                src={data != null ? data.avatar : ''}
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
            }
            <Divider/>
            <CardActions>
                {
                    isUpload ?
                        <Button variant="text" onClick={() => setIsUpload(false)}>{t("返回")}</Button>
                        :
                        <Button
                            className={classes.uploadButton}
                            color="primary"
                            variant="text"
                            onClick={() => setIsUpload(true)}
                        >
                            {t("上传头像")}
                        </Button>
                }
            </CardActions>
        </Card>
    );
};

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