import React, {useState, useEffect} from 'react';

import {
    Switch as SwitchRoute,
    Route,
    BrowserRouter
} from 'react-router-dom';

import './App.css';
import Template from "./tools/Template";
import Footer from './components/Footer';
import SimpleBackdrop from "./components/SimpleBackdrop";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import CustomizedSnackbars from "./components/CustomizedSnackbars";
import Home from "./page/home/Home";
import SignUp from "./page/user/SignUp";
import Login from "./page/user/Login";
import User from "./page/user/User";
import Demand from "./page/demand/DemandDetail";
import Main from "./admin/Main";

import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {makeStyles} from '@material-ui/core';
import Container from "@material-ui/core/Container";

export default function App() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [dark, setDark] = useState(true);
    const [theme, setTheme] = useState(LightTheme);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState("success");
    const [active, setActive] = useState(false);

    function changeActive() {
        setActive(!active);
    }

    useEffect(() => {
        let darkMode = localStorage.getItem("dark");
        if (darkMode != null) {
            if (darkMode === "true") {
                setDark(true);
                setTheme(DarkTheme);
            } else {
                setDark(false);
                setTheme(LightTheme);
            }
        } else if (dark) {
            localStorage.setItem("dark", "true");
            setTheme(DarkTheme);
        } else {
            localStorage.setItem("dark", "false");
            setTheme(LightTheme);
        }
    }, [dark]);


    function notice(msg, type) {
        setOpen(true);
        setMsg(msg);
        switch (type) {
            case -1:
                setSeverity("error");
                break;
            case 0:
                setSeverity("success");
                break;
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                setSeverity("warning");
                break;
            default:
                setSeverity("info");
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div className={dark ? classes.backgroundDark : classes.backgroundLight}>
                    <PrimarySearchAppBar
                        notice={notice}
                        active={active}
                        dark={dark}
                        setLoading={setLoading}
                        setDark={setDark}
                        changeActive={changeActive}
                    />
                    <Container className={classes.paddingTop}>
                        <SwitchRoute>
                            <Route path="/" exact>
                                <Home
                                    notice={notice}
                                    setLoading={setLoading}
                                    setOpen={setOpen}
                                />
                            </Route>
                            <Route path="/demand">
                                <Demand
                                    notice={notice}
                                    setLoading={setLoading}
                                    setOpen={setOpen}
                                />
                            </Route>
                            <Route path="/register">
                                <SignUp
                                    notice={notice}
                                    setLoading={setLoading}
                                    changeActive={changeActive}
                                />
                            </Route>
                            <Route path="/login">
                                <Login
                                    notice={notice}
                                    setLoading={setLoading}
                                    changeActive={changeActive}
                                />
                            </Route>
                            <Route path="/user">
                                <User
                                    notice={notice}
                                    setLoading={setLoading}
                                    setOpen={setOpen}
                                />
                            </Route>
                            <Route path="/admin">
                                <Main/>
                            </Route>
                            <Route path="/template">
                                <Template
                                    notice={notice}
                                    setLoading={setLoading}
                                />
                            </Route>
                        </SwitchRoute>
                        <Footer/>
                        <SimpleBackdrop loading={loading}/>
                        <CustomizedSnackbars
                            msg={msg}
                            severity={severity}
                            open={open}
                            setOpen={setOpen}
                        />
                        {/*<div className={classes.bottom}/>*/}
                        {/*<GlobalBottomNavigation/>*/}
                    </Container>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}
const useStyles = makeStyles({
    backgroundDark: {
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#333333",
    },
    backgroundLight: {
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
    },
    bottom: {
        height: 56,
    },
    paddingTop: {
        paddingTop: 10,
    },
    paddingBottom: {
        paddingBottom: 10,
    },
});

const DarkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#798be1',
        },
    },
    overrides: {
        MuiTypography: {
            root: {
                color: '#c6c6c6',
            },
        },
        MuiPaper: {
            root: {
                color: '#c6c6c6',
            },
        },
        MuiBottomNavigation: {
            root: {
                background: 'linear-gradient(45deg, #5c6bc0 30%, #5d6691 90%)',
                border: 0,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                width: '100%',
                margin: '0 auto',
                position: 'fixed',
                bottom: 0,
                right: 0,
            },
        },
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: '#3a3a3a'
            }
        }
    },
});

const LightTheme = createMuiTheme({
    palette: {
        type: 'light',
    },
    overrides: {
        MuiBottomNavigation: {
            root: {
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                width: '100%',
                margin: '0 auto',
                position: 'fixed',
                bottom: 0,
                right: 0,
            },
        },
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: '#4a5ecc'
            }
        }
    },
});