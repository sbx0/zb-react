import React from "react";

import {
    Switch,
    Redirect,
    Route,
} from "react-router-dom";

import {
    Home,
    Demand,
    Register,
    User,
    Login,
    NotFound,
    Certification,
} from "../page";
import {
    Main,
} from "../admin";
import {
    Template,
} from "../tools";
import Review from "../admin/Review";

function RoutesConfig({notice, setLoading, changeActive}) {
    return (
        <Switch>
            <Redirect
                exact
                from="/"
                to="/home"
            />
            <Route
                exact
                path="/home"
            >
                <Home notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/demand/:id"
            >
                <Demand notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/register"
            >
                <Register notice={notice} setLoading={setLoading} changeActive={changeActive}/>
            </Route>
            <Route
                exact
                path="/login"
            >
                <Login notice={notice} setLoading={setLoading} changeActive={changeActive}/>
            </Route>
            <Route
                exact
                path="/user"
            >
                <User notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/template"
            >
                <Template notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/certification"
            >
                <Certification notice={notice} setLoading={setLoading}/>
            </Route>

            <Route
                exact
                path="/admin"
            >
                <Main notice={notice} setLoading={setLoading}/>
            </Route>

            <Route
                exact
                path="/admin/review"
            >
                <Review notice={notice} setLoading={setLoading}/>
            </Route>

            <Route
                exact
                path="/notFound"
            >
                <NotFound/>
            </Route>
            <Redirect to="/notFound"/>
        </Switch>
    );
}

export default RoutesConfig;