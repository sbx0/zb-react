import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from "react-router-dom";
import "../../../i18N"

import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {fetchGet, fetchStatus, fetchStatusAlert} from "../../../tools/Network";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ReactMarkdown from "react-markdown";
import Chip from "@material-ui/core/Chip";
import FaceIcon from '@material-ui/icons/Face';
import Grid from "@material-ui/core/Grid";
import {CardContent, CardHeader, Divider} from "@material-ui/core";
import Card from "@material-ui/core/Card";

export default function CertificationCard({notice, setLoading}) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const [certification, setCertification] = useState(null)
    const [isShow, setIsShow] = useState(false)
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
            } else if (status != 1) {
                notice(t(fetchStatusAlert(status)), status);
            }
            setLoading(false);
        }).catch((error) => {
            notice(error.toString(), -1);
            setLoading(false);
        });
    }, []);

    function handelClick() {
        setIsShow(!isShow);
    }

    function handelCancel() {
        let url = 'user/certification/cancel';
        setLoading(true);
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            notice(t(fetchStatusAlert(status)), status);
            setLoading(false);
        }).catch((error) => {
            notice(error.toString(), -1);
            setLoading(false);
        });
    }

    return (
        <>
            <Card>
                <CardHeader
                    subheader={t("认证用户享受绿色通道")}
                    title={t("认证")}
                />
                <Divider/>
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.center}
                    >
                        {
                            certification == null || certification.status === -1 || certification.status === -2 ?
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<VerifiedUserIcon/>}
                                    onClick={() => {
                                        history.push("/certification")
                                    }}
                                >
                                    {t("认证")}
                                </Button>
                                :
                                <BuildCertificationChip
                                    certification={certification}
                                    handelCancel={handelCancel}
                                    handelClick={handelClick}
                                />
                        }
                        {
                            isShow && certification != null ?
                                <Grid item>
                                    <ReactMarkdown
                                        source={certification.material}
                                        escapeHtml={false}
                                    />
                                </Grid>
                                :
                                <></>
                        }
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}

function BuildCertificationChip({certification, handelCancel, handelClick}) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    let location = useLocation();
    let history = useHistory();

    switch (certification.status) {
        case -2:
            return <Chip
                icon={<FaceIcon/>}
                label={t("已取消")}
                onDelete={handelCancel}
                onClick={handelClick}
                color="secondary"
            />;
        case -1:
            return <Chip
                icon={<FaceIcon/>}
                label={t("未通过")}
                onDelete={handelCancel}
                onClick={handelClick}
                color="secondary"
            />;
        case 0:
            return <Chip
                icon={<FaceIcon/>}
                label={t("审核中")}
                onDelete={handelCancel}
                onClick={handelClick}
                color="secondary"
            />
        case 1:
            return <Chip
                icon={<FaceIcon/>}
                label={t("认证种类" + certification.kind)}
                onClick={handelClick}
                color="primary"
            />
    }
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
    center: {
        justifyContent: 'center'
    }
}));