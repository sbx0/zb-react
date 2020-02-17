import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../i18N"

import {useHistory, useLocation} from "react-router-dom";

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
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {Wifi} from "@material-ui/icons";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';

export default function Beta({notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const [serverConfig, setServerConfig] = useState(localStorage.getItem("server_config"));
    const [autoDarkMode, setAutoDarkMode] = useState(() => {
        let autoDarkMode = localStorage.getItem("auto_dark_mode");
        return autoDarkMode === "true";
    });
    const [openConsole, setOpenConsole] = useState(() => {
        let openConsole = localStorage.getItem("open_console");
        return openConsole === "true";
    });

    function handleChange(event) {
        setServerConfig(event.target.value)
    }

    function submit() {
        localStorage.setItem("server_config", serverConfig);
        notice(t(fetchStatusAlert(0)), 0);
    }

    return (
        <Container component="main">
            <Grid container spacing={2}>
                <Grid
                    item
                    lg={12}
                    md={12}
                    xl={12}
                    xs={12}
                >
                    <List subheader={<ListSubheader>{t("开发者选项")}</ListSubheader>} className={classes.root}>
                        <ListItem>
                            <ListItemIcon>
                                <DeveloperModeIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("开启控制台")}/>
                            <ListItemSecondaryAction>
                                <Switch
                                    color="primary"
                                    onChange={() => {
                                        setOpenConsole(!openConsole);
                                        localStorage.setItem("open_console", !openConsole + "");
                                        window.location.replace(window.location.pathname);
                                    }}
                                    checked={openConsole}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <BrightnessAutoIcon/>
                            </ListItemIcon>
                            <ListItemText primary={t("自动开启夜间模式")}/>
                            <ListItemSecondaryAction>
                                <Switch
                                    color="primary"
                                    onChange={() => {
                                        setAutoDarkMode(!autoDarkMode);
                                        localStorage.setItem("auto_dark_mode", !autoDarkMode + "");
                                    }}
                                    checked={autoDarkMode}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Grid>
                <Grid
                    item
                    lg={6}
                    md={6}
                    xl={6}
                    xs={12}
                >
                    <Typography
                        variant="inherit"
                        align="center"
                        onClick={() => setServerConfig(localStorage.getItem("server_config"))}
                    >
                        {t("当前")} {localStorage.getItem("server_config")}<br/>
                    </Typography>
                    <Typography
                        variant="inherit"
                        align="center"
                        onClick={() => setServerConfig("https://zb.sbx0.cn/")}
                    >
                        {t("官方")} https://zb.sbx0.cn/<br/>
                    </Typography>
                    <Typography
                        variant="inherit"
                        align="center"
                        onClick={() => setServerConfig("http://localhost:8085/")}
                    >
                        {t("本地")} http://localhost:8085/<br/>
                    </Typography>
                    <Typography
                        variant="inherit"
                        align="center"
                        onClick={() => setServerConfig("http://192.168.137.1:8085/")}
                    >
                        {t("自定")} http://192.168.137.1:8085/<br/>
                    </Typography>
                </Grid>
                <Grid
                    item
                    lg={6}
                    md={6}
                    xl={6}
                    xs={12}
                >
                    <Grid
                        item
                        lg={12}
                    >
                        <TextField
                            label={t("服务器配置")}
                            value={serverConfig}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            fullWidth
                            autoFocus
                        />
                    </Grid>
                    <Divider variant="middle" className={classes.divider}/>
                    <Grid
                        item
                        lg={12}
                    >
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => submit()}
                        >
                            {t("保存")}
                        </Button>
                    </Grid>
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
}));