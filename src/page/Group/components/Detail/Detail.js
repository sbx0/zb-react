import React, {useState, useEffect} from 'react';
import "../../../../i18N"
import {
    fetchGet,
    fetchStatus,
    fetchStatusAlert,
    getUserGroupCheck, getUserGroupJoin,
    getUserGroupMember,
    getUserGroupOne, getUserGroupQuit
} from "../../../../tools/Network";
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation, useParams} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {Card, CardContent, CardHeader, LinearProgress} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ShowUser from "../../../../Components/ShowUser";
import UserList from "../../../User/List/List";
import RecentActivity from "../RecentActivity/RecentActivity";

export default function GroupDetail({notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let {id} = useParams();
    const [group, setGroup] = useState({
        name: '',
        ownerId: '',
        limitNumber: '',
        currentNumber: '',
    });
    const [users, setUsers] = useState([]);
    const [loadActive, setLoadActive] = useState(false);

    useEffect(() => {
        getUserGroupMember(
            {id: id}
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                setUsers(json["objects"]);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        }).finally(() => {
        })
    }, [loadActive]);

    useEffect(() => {
        setLoading(true);
        getUserGroupOne(
            {id: id}
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                setGroup(json["object"]);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        }).finally(() => {
            setLoading(false);
        })
    }, [loadActive]);

    return <>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {
                            group?.name === '' ?
                                <>
                                    <Typography component="h1" variant="h5">
                                        {t("加载中")}
                                    </Typography>
                                </>
                                :
                                <>
                                    <Card>
                                        <CardHeader
                                            subheader={''}
                                            title={group?.name}
                                        />
                                        <CardContent>
                                            <Grid
                                                container
                                                alignItems={"center"}
                                                alignContent={"center"}
                                                spacing={2}
                                                className={classes.center}
                                            >
                                                <Grid item xs={4}>
                                                    {group?.currentNumber} / {group?.limitNumber}
                                                    <LinearProgress
                                                        variant={"determinate"}
                                                        value={group?.currentNumber * 100 / group?.limitNumber}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <ShowUser
                                                        notice={notice}
                                                        id={group?.ownerId}
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <CheckButton
                                                        loadActive={loadActive}
                                                        setLoadActive={setLoadActive}
                                                        notice={notice}
                                                        id={group?.id}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <RecentActivity notice={notice} setLoading={setLoading}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <UserList notice={notice} setLoading={setLoading} loadActive={loadActive} users={users}/>
            </Grid>
        </Grid>
    </>;
}

function CheckButton({id, notice, loadActive, setLoadActive}) {
    const classes = useStyles();
    const {t} = useTranslation();
    const [isJoin, setIsJoin] = useState(false);

    useEffect(() => {
        getUserGroupCheck(
            {id: id}
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                setIsJoin(true);
            } else {
                setIsJoin(false);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        }).finally(() => {
        })
    }, [loadActive]);
    return <>
        {
            isJoin ?
                <QuitButton id={id} notice={notice} loadActive={loadActive} setLoadActive={setLoadActive}/>
                :
                <JoinButton id={id} notice={notice} loadActive={loadActive} setLoadActive={setLoadActive}/>

        }
    </>
}

function JoinButton({id, notice, loadActive, setLoadActive}) {
    const classes = useStyles();
    const {t} = useTranslation();

    useEffect(() => {
    }, []);

    return <Button
        variant="outlined"
        fullWidth
        size={"small"}
        onClick={
            () => {
                getUserGroupJoin(
                    {id: id}
                ).then((json) => {
                    const status = json['status'];
                    if (fetchStatus(status)) {
                        setLoadActive(!loadActive);
                    } else {
                        notice(t(fetchStatusAlert(status)), status);
                    }
                }).catch((error) => {
                    notice(error.toString(), -1);
                }).finally(() => {
                })
            }
        }
    >
        {t("加入")}
    </Button>
}

function QuitButton({id, notice, loadActive, setLoadActive}) {
    const classes = useStyles();
    const {t} = useTranslation();

    useEffect(() => {
    }, [])

    return <Button
        variant="outlined"
        fullWidth
        size={"small"}
        onClick={() => {
            getUserGroupQuit(
                {id: id}
            ).then((json) => {
                const status = json['status'];
                if (fetchStatus(status)) {
                    setLoadActive(!loadActive);
                } else {
                    notice(t(fetchStatusAlert(status)), status);
                }
            }).catch((error) => {
                notice(error.toString(), -1);
            }).finally(() => {
            })
        }}
    >
        {t("退出")}
    </Button>
}

const useStyles = makeStyles(theme => ({
    center: {
        textAlign: 'center'
    }
}));