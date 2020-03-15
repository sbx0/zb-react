import React from 'react';
import "../../../i18N"
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemText
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

export default function UserList({notice, setLoading, loadActive, users}) {
    const classes = useStyles();
    const {t} = useTranslation();

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
                                                <div key={'userList' + user.id}>
                                                    <ListItem>
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
                                                        variant={'inset'}
                                                        component={'li'}
                                                    />
                                                </div>
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