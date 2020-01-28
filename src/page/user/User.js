import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import "../../i18N/i18N"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
} from "react-router-dom";
import tools from "../../tools/Utils";
import {fetchGet, fetchStatusAlert} from "../../tools/Network";
import Typography from "@material-ui/core/Typography";
import ReactMarkdown from "react-markdown";
import Avatar from "@material-ui/core/Avatar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";

export default function User({setLoading, notice}) {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:userId`}>
                <UserDetail notice={notice} setLoading={setLoading}/>
            </Route>
            <Route path={match.path}>
                <MyDetail notice={notice} setLoading={setLoading}/>
            </Route>
        </Switch>
    );
}


function MyDetail({setLoading, notice}) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        let url = 'user/base/info';
        setLoading(true);
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (tools.statusToBool(status)) {
                setUserInfo(json.object);
                setUser(json.user);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Avatar alt={user.name} src={user["avatar"]} className={classes.avatar}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" color="textSecondary" align="center">
                        {user.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" color="textSecondary" align="center">
                        Lv.{userInfo["level"]}
                    </Typography>
                </Grid>
            </Grid>
            <Typography paragraph color="textSecondary">
                <ReactMarkdown
                    source={user["introduction"]}
                    escapeHtml={false}
                />
            </Typography>
        </>
    );
}

function UserDetail({setLoading, notice}) {
    const {t, i18n} = useTranslation();
    let {userId} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        let url = '/demand/normal?id=' + userId;
        setLoading(true);
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (tools.statusToBool(status)) {
                setUser(json.object);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
            setLoading(false);
        });
    }, [userId]);

    return (
        <>
            <Typography variant="h4" color="textSecondary" align="center">{user.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary" align="center">{user.time}</Typography>
            <Typography paragraph color="textSecondary">
                <ReactMarkdown
                    source={user.content}
                    escapeHtml={false}
                />
            </Typography>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '5px 8px',
        margin: '0px auto',
    },
    center: {
        margin: '5px auto',
    },
    avatar: {
        margin: '0px auto',
        width: theme.spacing(5),
        height: theme.spacing(5),
    }
}));