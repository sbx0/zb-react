import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../i18N/"

import {
    Switch,
    Route,
    useRouteMatch,
    useParams
} from "react-router-dom";

import tools from "../../tools/Utils";
import {fetchGet} from "../../tools/Network";

import ReactMarkdown from "react-markdown";
import Typography from "@material-ui/core/Typography";

export default function Demand({setLoading, notice}) {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:demandId`}>
                <DemandDetail notice={notice} setLoading={setLoading}/>
            </Route>
            <Route path={match.path}>
                <h1>404</h1>
            </Route>
        </Switch>
    );
}

function DemandDetail({setLoading, notice}) {
    const {t} = useTranslation();
    let {demandId} = useParams();
    const [demand, setDemand] = useState({});

    useEffect(() => {
        let url = 'demand/normal?id=' + demandId;
        setLoading(true);
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (tools.statusToBool(status)) {
                setDemand(json.object);
            } else {
                notice(t(tools.statusToAlert(status)), status);
            }
            setLoading(false);
        }).catch((error) => {
            notice(error.toString(), -1);
            setLoading(false);
        });
    }, [demandId]);

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