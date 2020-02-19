import React, {useState, useEffect} from 'react';
import "../../../i18N"
import {fetchGet, fetchStatus, fetchStatusAlert} from "../../../tools/Network";
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
    Badge,
    Card,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import ShowUser from "../../../Components/ShowUser";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

export default function UserList({notice, setLoading, loadActive, users}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();

    return <>
        <div className={classes.paper}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    {
                        users.length === 0 ?
                            <Typography variant="inherit">{name} {t("暂无结果")}</Typography>
                            :
                            <Card>
                                <CardHeader
                                    subheader={''}
                                    title={t('成员')}
                                />
                                <CardContent>
                                    <List>
                                        {
                                            users.map((user) => (
                                                <>
                                                    <ListItem key={'userList' + user.id}>
                                                        <ListItemAvatar>
                                                            <Avatar
                                                                src={
                                                                    user['avatar'] === 'avatar.jpg' ?
                                                                        user['avatar']
                                                                        :
                                                                        localStorage.getItem("server_config") + user['avatar']
                                                                }
                                                            />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={user.name}/>
                                                    </ListItem>
                                                    <Divider
                                                        key={'userListDivider' + user.id}
                                                        variant={'inset'}
                                                        component={'li'}
                                                    />
                                                </>
                                            ))
                                        }
                                    </List>
                                </CardContent>
                            </Card>
                    }
                </Grid>
            </Grid>
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