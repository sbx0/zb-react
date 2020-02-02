import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from "react-router-dom";
import "../../../i18N"

import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {fetchGet, fetchStatus, fetchStatusAlert} from "../../../tools/Network";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ReactMarkdown from "react-markdown";

export default function CertificationCard({notice, setLoading}) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const [certification, setCertification] = useState(null)
    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        let url = 'user/certification/check';
        setLoading(true);
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                setCertification(json["object"]);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
            setLoading(false);
        }).catch((error) => {
            notice(error.toString(), -1);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {
                certification == null ?
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
                    :
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {t("认证种类")}:{certification.kind}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {t("提交时间")}:{certification.submitTime}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {t("提交状态")}:{certification.status}
                            </Typography>
                            <ReactMarkdown
                                source={certification.material}
                                escapeHtml={false}
                            />
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
            }
        </>
    );
}

const useStyles = makeStyles(theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));