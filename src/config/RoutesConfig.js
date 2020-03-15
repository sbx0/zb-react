import React, {useEffect} from "react";

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
    Beta
} from "../page";
import {
    Main,
} from "../admin";
import {
    Template,
} from "../tools";
import Review from "../admin/Review";
import Table from "../admin/Table";
import Group from "../page/Group/Group";
import GroupSearch from "../page/Group/components/Search/Search";
import GroupDetail from "../page/Group/components/Detail/Detail";
import ChatPage from "../page/Chat/Chat";
import PostAchievements from "../page/Post/PostAchievements";
import Post from "../page/Post/Post";
import TechnicalAchievementsOne from "../page/One/TechnicalAchievementsOne";
import TechnicalAchievementMarket from "../page/Market/TechnicalAchievementMarket";

function RoutesConfig(
    {
        loading,
        user,
        notice,
        setLoading,
        active,
        changeActive
    }
) {
    useEffect(() => {
        console.log('routes change')
    }, []);

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
                <Home notice={notice} loading={loading} setLoading={setLoading}/>
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
                path="/template"
            >
                <Template notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/beta"
            >
                <Beta notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/group"
            >
                <Group notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/group/search"
            >
                <GroupSearch notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/group/detail/:id"
            >
                <GroupDetail notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/chat/public"
            >
                <ChatPage user={user} notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/chat/with/:id"
            >
                <ChatPage user={user} notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/post"
            >
                <Post notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/post/technical/achievements"
            >
                <PostAchievements notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/one/technical/achievements/:id"
            >
                <TechnicalAchievementsOne notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/market/technical/achievements"
            >
                <TechnicalAchievementMarket notice={notice} setLoading={setLoading}/>
            </Route>
            <Route
                exact
                path="/market/technical/achievements/:key"
            >
                <TechnicalAchievementMarket notice={notice} setLoading={setLoading}/>
            </Route>
            {
                user != null ?
                    <>
                        <Route
                            exact
                            path="/user"
                        >
                            <User
                                user={user}
                                notice={notice}
                                setLoading={setLoading}
                                active={active}
                                changeActive={changeActive}
                            />
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
                            <Main notice={notice}/>
                        </Route>
                        <Route
                            exact
                            path="/admin/review"
                        >
                            <Review notice={notice}/>
                        </Route>
                        <Route
                            exact
                            path="/admin/table"
                        >
                            <Table notice={notice}/>
                        </Route>
                    </>
                    :
                    <Redirect to="/login"/>
            }
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