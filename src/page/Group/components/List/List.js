import React, {useState, useEffect} from 'react';
import "../../../../i18N"
import {fetchGet, fetchStatus, fetchStatusAlert} from "../../../../tools/Network";
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

export default function GroupList({notice, setLoading, groups, from, name, searchActive, setSearchActive}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();

    return <>
        <div className={classes.paper}>
            {
                groups.length === 0 ?
                    <>
                        <Grid
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            {
                                from === 'index' ?
                                    <>
                                        <Grid item xs={12}>
                                            <Typography variant="inherit">{t("尚未加入或创建任何群组")}</Typography>
                                        </Grid>
                                        <Divider variant="fullWidth" className={classes.divider}/>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                onClick={() => {
                                                    history.push("/group/search")
                                                }}
                                            >
                                                {t("搜索群组")}
                                            </Button>
                                        </Grid>
                                    </>
                                    :
                                    <>
                                        {
                                            name === '' ?
                                                <>
                                                    <Grid item xs={12}>
                                                        <Typography variant="inherit">{name} {t("暂无结果")}</Typography>
                                                    </Grid>
                                                </>
                                                :
                                                <>
                                                    <Grid item xs={12}>
                                                        <Typography variant="inherit">{name} {t("尚未创建")}</Typography>
                                                    </Grid>
                                                    <Divider variant="fullWidth" className={classes.divider}/>
                                                    <Grid item xs={12}>
                                                        <Button
                                                            variant="outlined"
                                                            fullWidth
                                                            onClick={() => {
                                                                let url = 'user/group/create?name=' + name;
                                                                fetchGet(
                                                                    url
                                                                ).then((json) => {
                                                                    const status = json['status'];
                                                                    notice(t(fetchStatusAlert(status)), status);
                                                                    setSearchActive(!searchActive);
                                                                }).catch((error) => {
                                                                    notice(error.toString(), -1);
                                                                });
                                                            }}
                                                        >
                                                            {t("创建")} {name}
                                                        </Button>
                                                    </Grid></>
                                        }
                                    </>
                            }
                        </Grid>
                    </>
                    :
                    <>
                        {
                            groups.map((group) => (
                                <Grid container justify="space-between" key={group['id']}>
                                    <Grid item xs={12}>
                                        <Typography variant={'h6'}>
                                            {group['name']}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ShowUser
                                            notice={notice}
                                            id={group['ownerId']}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Badge badgeContent={group['limitNumber']}>
                                            <GroupIcon/>
                                        </Badge>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider
                                            variant="fullWidth"
                                            className={classes.divider}
                                        />
                                    </Grid>
                                </Grid>
                            ))
                        }
                        {
                            from === 'index' ?
                                <Grid item xs={12}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        onClick={() => {
                                            history.push("/group/search")
                                        }}
                                    >
                                        {t("搜索群组")}
                                    </Button>
                                </Grid>
                                :
                                <></>
                        }
                    </>
            }
        </div>
    </>;
}

function ShowUser({id, notice}) {
    const classes = useStyles();
    const [user, setUser] = useState(null);

    useEffect(() => {
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

const useStyles = makeStyles(theme => ({
    center: {
        display: 'block',
        margin: '5px auto',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
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