import React, {useState, useEffect} from 'react';
import "../../../../i18N"
import {fetchGet, fetchStatus, fetchStatusAlert} from "../../../../tools/Network";
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation, useParams} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {Badge, Card, CardContent, CardHeader, Divider, LinearProgress} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import GroupList from "../List/List";
import Container from "@material-ui/core/Container";
import ShowUser from "../../../../Components/ShowUser";
import GroupIcon from "@material-ui/icons/Group";
import UserList from "../../../User/List/List";

export default function GroupDetail({notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
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
        let url = 'user/group/member?id=' + id;
        fetchGet(
            url
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
        let url = 'user/group/one?id=' + id;
        setLoading(true);
        fetchGet(
            url
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
        <Container component="main">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
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
                <Grid item xs={12} sm={12} md={6}>
                    <UserList notice={notice} setLoading={setLoading} loadActive={loadActive} users={users}/>
                </Grid>
            </Grid>
        </Container>
    </>;
}

function CheckButton({id, notice, loadActive, setLoadActive}) {
    const classes = useStyles();
    const {t} = useTranslation();
    const [isJoin, setIsJoin] = useState(false);

    useEffect(() => {
        let url = 'user/group/check?id=' + id;
        fetchGet(
            url
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

    return <Button
        variant="outlined"
        fullWidth
        size={"small"}
        onClick={
            () => {
                let url = 'user/group/join?id=' + id;
                fetchGet(
                    url
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

    return <Button
        variant="outlined"
        fullWidth
        size={"small"}
        onClick={() => {
            let url = 'user/group/quit?id=' + id;
            fetchGet(
                url
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