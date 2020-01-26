import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import tools from "../../tools/Utils";
import {fetchGet} from "../../tools/Network";
import Typography from "@material-ui/core/Typography";
import ReactMarkdown from "react-markdown";

export default function Demand({setLoading, notice}) {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:demandId`}>
                <DemandDetail notice={notice} setLoading={setLoading}/>
            </Route>
            <Route path={match.path}>
                <h3>Please select a topic.</h3>
            </Route>
        </Switch>
    );
}

function DemandDetail({setLoading, notice}) {
    let {demandId} = useParams();
    const [demand, setDemand] = useState({});

    useEffect(() => {
        let url = '/demand/normal?id=' + demandId;
        setLoading(true);
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (tools.statusToBool(status)) {
                setDemand(json.object);
            } else {
                notice(tools.statusToAlert(status), status);
            }
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