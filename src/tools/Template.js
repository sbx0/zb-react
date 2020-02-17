import React, {useState, useEffect} from 'react';
import "../i18N"
import {fetchGet, fetchStatus, fetchStatusAlert} from "../tools/Network";
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {Divider} from "@material-ui/core";

export default function Template({notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const [value, setValue] = useState("welcome");
    const [values, setValues] = useState([
        {name: 'f'},
        {name: 'u'},
        {name: 'c'},
        {name: 'k'},
    ]);

    function test() {
        setLoading(true);
        notice(location.pathname, 0);
        history.push("/template");
        setValue("fuck you");
        setLoading(false);
    }

    useEffect(() => {
        notice(value, -1);
    }, [value]);

    useEffect(() => {
        let url = 'user/base/notLogin';
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            notice(t(fetchStatusAlert(status)), status);
        }).catch((error) => {
            notice(error.toString(), -1);
        });
    }, [value]);

    return (
        <div className={classes.center}>
            <Typography variant="h3" align="center">{t("测试模块")}</Typography>
            <Button
                variant="contained"
                color="secondary"
                className={classes.center}
                onClick={test}
            >
                {t("不要点我")}
            </Button>
            <Divider/>
            {
                values.map((one) => (
                    <Typography variant="inherit" align="center" key={one.name}>{one.name}</Typography>
                ))
            }
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    center: {
        display: 'block',
        margin: '5px auto',
    },
}));