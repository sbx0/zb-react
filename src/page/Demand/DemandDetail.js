import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../i18N/"

import {
    useParams
} from "react-router-dom";

import {fetchStatus, fetchStatusAlert, getDemandNormal} from "../../tools/Network";

import ReactMarkdown from "react-markdown";
import Typography from "@material-ui/core/Typography";

export default function DemandDetail({setLoading, notice}) {
    const {t} = useTranslation();
    let {id} = useParams();
    const [demand, setDemand] = useState({});

    useEffect(() => {
        setLoading(true);
        getDemandNormal(
            {id: id}
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                setDemand(json["object"]);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        }).finally(() => {
            setLoading(false);
        })
    }, [id]);

    return (
        <>
            <Typography variant="h4" color="textSecondary" align="center">{demand.title}</Typography>
            <Typography variant="subtitle1" color="textSecondary" align="center">{demand.time}</Typography>
            <Typography paragraph color="textSecondary">
                <ReactMarkdown
                    source={demand.content}
                    escapeHtml={false}
                />
            </Typography>
        </>
    );
}