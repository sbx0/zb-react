import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../i18N"

import {Link, useHistory, useLocation} from "react-router-dom";

import {fetchGet, fetchStatus, fetchStatusAlert} from "../../tools/Network";

import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import tools from "../../tools/Utils";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import GroupIcon from '@material-ui/icons/Group';
import Checkbox from "@material-ui/core/Checkbox";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {List, ListItem, ListItemIcon, ListItemText, Badge} from "@material-ui/core";

export default function Group({notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const [joinOrHave, setJoinOrHave] = useState(false);

    useEffect(() => {
        // todo join or not
        setLoading(true);
        let url = 'user/base/notLogin';
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            setJoinOrHave(false);
            // notice(t(fetchStatusAlert(status)), status);
        }).catch((error) => {
            notice(error.toString(), -1);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <Container component="main">
            {
                joinOrHave ?
                    <></>
                    :
                    <NotJoinGroupOrOwner notice={notice} setLoading={setLoading}/>
            }
        </Container>
    );
}

function NotJoinGroupOrOwner({notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const [name, setName] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [searchShow, setSearchShow] = useState(true);

    function searchKeyHandleChange(event) {
        setName(event.target.value);
    }

    function submit() {
        setSearchActive(!searchActive);
    }

    return <>
        <div className={classes.paper}>
            <Grid container spacing={2}>
                {
                    searchShow ?
                        <>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label={t("群组名称")}
                                    value={name}
                                    onChange={searchKeyHandleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={submit}
                                >
                                    {t("搜索")}
                                </Button>
                            </Grid>
                            <Divider variant="middle" className={classes.divider}/>
                        </>
                        :
                        <>
                        </>
                }
                <Grid item xs={12}>
                    <GroupList
                        setSearchShow={setSearchShow}
                        setSearchActive={setSearchActive}
                        searchActive={searchActive}
                        name={name}
                        notice={notice}
                        setLoading={setLoading}
                    />
                </Grid>
            </Grid>
        </div>
    </>;
}

function GroupList({notice, setLoading, name, searchActive, setSearchShow, setSearchActive}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(null);

    function createGroup() {
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
    }

    useEffect(() => {
        let url = '';
        if (name === '') {
            url = 'user/group/list?page=1';
        } else {
            url = 'user/group/list?page=1&name=' + name;
        }
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                const objects = json['objects'];
                setGroups(objects);
                setGroup(null);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
    }, [searchActive]);

    return <>
        <Grid container spacing={2}>
            {
                group == null ?
                    <Grid item xs={12}>
                        {
                            groups?.length === 0 ?
                                <Typography component="span" variant="inherit" onClick={createGroup}>
                                    {name} 不存在，需要创建该组吗？
                                </Typography>
                                :
                                <List>
                                    {
                                        groups.map((group) => (
                                            <ListItem
                                                key={group.id}
                                                button
                                                onClick={() => {
                                                    setGroup(group);
                                                    setSearchShow(false);
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Badge badgeContent={group.limitNumber}>
                                                        <GroupIcon/>
                                                    </Badge>
                                                </ListItemIcon>
                                                <ListItemText primary={group.name}/>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                        }
                    </Grid>
                    :
                    <Grid item xs={12}>
                        <GroupDetail
                            group={group}
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="outlined"
                            className={classes.divider}
                            onClick={() => {
                                setGroup(null);
                                setSearchShow(true);
                            }}
                        >
                            {t("返回")}
                        </Button>

                    </Grid>
            }
        </Grid>
    </>;
}

function GroupDetail({group}) {
    const classes = useStyles();
    return <>
        {
            group == null ?
                <></>
                :
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        {group?.name}
                    </Typography>
                    <Typography variant="inherit">
                        群主 {group?.ownerId} | 人数限制 {group?.limitNumber}
                    </Typography>
                    <Tabs
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="disabled tabs example"
                    >
                        <Tab label="动态"/>
                        <Tab label="项目"/>
                        <Tab label="成员"/>
                        <Tab label="操作"/>
                    </Tabs>
                </div>
        }
    </>;
}

const useStyles = makeStyles(theme => ({
    center: {
        display: 'block',
        margin: '5px auto',
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));