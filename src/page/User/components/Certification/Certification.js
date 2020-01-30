import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../../../i18N"

import {useHistory, useLocation} from "react-router-dom";

import {fetchGet, fetchStatusAlert} from "../../../../tools/Network";

import {makeStyles} from '@material-ui/core/styles';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from "@material-ui/core/Button";

export default function Certification({notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const [value, setValue] = useState("welcome");

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
            notice(fetchStatusAlert(status), status);
        }).catch((error) => {
            notice(error.toString(), -1);
        });
    }, [value]);

    return (
        <div className={classes.center}>
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.center}
                startIcon={<VerifiedUserIcon/>}
                onClick={() => {
                    history.push("/certification")
                }}
            >
                {t("认证")}
            </Button>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    center: {
        margin: '5px auto',
        textAlign: 'center',
    },
}));