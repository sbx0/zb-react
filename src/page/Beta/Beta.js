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

    function handleChange(event) {
        setServerConfig(event.target.value)
    }

    function submit() {
        localStorage.setItem("server_config", serverConfig);
        notice(t(fetchStatusAlert(0)), 0);
    }

    useEffect(() => {
        console.log(autoDarkMode)
    }, [autoDarkMode])

    return (
        <Container component="main">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                color="primary"
                                onChange={() => {
                                    setAutoDarkMode(!autoDarkMode);
                                    localStorage.setItem("auto_dark_mode", !autoDarkMode + "");
                                }}
                                checked={autoDarkMode}
                            />}
                        label={t("自动开启夜间模式")}
                        labelPlacement="start"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="inherit" align="center"
                                onClick={() => setServerConfig(localStorage.getItem("server_config"))}>
                        {t("当前配置")} {localStorage.getItem("server_config")}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="inherit" align="center" onClick={() => setServerConfig("https://zb.sbx0.cn/")}>
                        {t("官方服务器")} https://zb.sbx0.cn/
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="inherit" align="center"
                                onClick={() => setServerConfig("http://localhost:8085/")}>
                        {t("本地测试")} http://localhost:8085/
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="inherit" align="center"
                                onClick={() => setServerConfig("http://192.168.137.1:8085/")}>
                        {t("指定IP")} http://192.168.137.1:8085/
                    </Typography>
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
        </Container>
    );
}

const useStyles = makeStyles(theme => ({
    center: {
        display: 'block',
        margin: '5px auto',
    },
}));