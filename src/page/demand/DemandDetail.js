import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

export default function Demand() {
    let match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.path}/:demandId`}>
                <DemandDetail />
            </Route>
            <Route path={match.path}>
                <h3>Please select a topic.</h3>
            </Route>
        </Switch>
    );
}

function DemandDetail() {
    let { demandId } = useParams();
    return <h3>Requested demand ID: {demandId}</h3>;
}