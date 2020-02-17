import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../i18N"

import {Link, useHistory, useLocation} from "react-router-dom";

import {fetchGet, fetchStatusAlert} from "../../tools/Network";

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

export default function Group({notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const [groupName, setGroupName] = useState("");
    const [value, setValue] = useState(2);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };


    function handleChange(event) {
        setGroupName(event.target.value)
    }

    function submit() {
        notice(t(fetchStatusAlert(0)), 0);
    }

    useEffect(() => {

    }, [])

    return (
        <Container component="main">
            <div className={classes.paper}>
                <Avatar>
                    <GroupIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t("智贝科技有限公司")}
                </Typography>
                <Typography variant="inherit">
                    创建者 sbx0 | 人数 2/10
                </Typography>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleTabChange}
                    aria-label="disabled tabs example"
                >
                    <Tab label="动态"/>
                    <Tab label="项目"/>
                    <Tab label="成员"/>
                    <Tab label="操作"/>
                </Tabs>
            </div>
            <Divider variant="middle" className={classes.divider}/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        variant="inherit"
                        align="center"
                    >
                        {t("群组")}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label={t("群组名称")}
                        value={groupName}
                        onChange={handleChange}
                        variant="outlined"
                        required
                        fullWidth
                        autoFocus
                    />
                </Grid>
                <Grid item xs={6}>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"

                        onClick={() => submit()}
                    >
                        {t("创建")}
                    </Button>
                    <Divider variant="middle" className={classes.divider}/>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => submit()}
                    >
                        {t("搜索")}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
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