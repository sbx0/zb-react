import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import "../../i18N"
import {useHistory, useLocation} from "react-router-dom";
import {
    Switch,
    Route,
    useRouteMatch,
    useParams,
} from "react-router-dom";
import {fetchStatus, fetchStatusAlert, getUserBaseInfo, getDemandNormal} from "../../tools/Network";
import ReactMarkdown from "react-markdown";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CertificationCard from "./CertificationCard/CertificationCard"
import AccountProfile from "./AccountProfile/AccountProfile";

export default function User(
    {
        user,
        setLoading,
        notice,
        changeActive,
        active
    }
) {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:userId`}>
                <UserDetail notice={notice} setLoading={setLoading}/>
            </Route>
            <Route path={match.path}>
                <MyDetail
                    user={user}
                    notice={notice}
                    setLoading={setLoading}
                    changeActive={changeActive}
                />
            </Route>
        </Switch>
    );
}


function MyDetail(
    {
        user,
        setLoading,
        notice,
        changeActive,
        active
    }
) {
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        setLoading(true);
        getUserBaseInfo().then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                setUserInfo(json.object);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
            setLoading(false);
        }).catch((error) => {
            notice(error.toString(), -1);
            setLoading(false);
        });
    }, [active]);

    return (
        <>
            <Grid
                container
                spacing={2}
            >
                <Grid
                    item
                    lg={4}
                    md={6}
                    xl={4}
                    xs={12}
                >
                    <AccountProfile
                        data={user}
                        info={userInfo}
                        notice={notice}
                        active={active}
                        changeActive={changeActive}
                    />
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={6}
                    xl={8}
                    xs={12}
                >
                    <CertificationCard notice={notice} setLoading={setLoading}/>
                </Grid>
            </Grid>
        </>
    );
}

function UserDetail({setLoading, notice}) {
    const {t, i18n} = useTranslation();
    let {userId} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        setLoading(true);
        getDemandNormal(
            {id: userId}
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                setUser(json.object);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
            setLoading(false);
        }).catch((error) => {
            notice(error.toString(), -1);
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