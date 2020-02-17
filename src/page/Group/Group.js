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
import {List, ListItem, ListItemIcon, ListItemText, Badge, Card, CardHeader, CardContent} from "@material-ui/core";
import GroupList from "./components/List/List";

export default function Group({notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        let url = 'user/group/my';
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                const objects = json['objects'];
                setGroups(objects);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
    }, []);

    return (
        <Container component="main">
            <Card>
                <CardHeader
                    subheader={t("创建或加入的群组")}
                    title={t("我的群组")}
                />
                <CardContent>
                    <GroupList
                        notice={notice}
                        setLoading={setLoading}
                        groups={groups}
                        from="index"
                    />
                </CardContent>
            </Card>
        </Container>
    );
}

const useStyles = makeStyles(theme => ({}));