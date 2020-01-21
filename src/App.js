import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch as SwitchRoute} from 'react-router-dom';

import './App.css';
import Footer from './components/Footer';

import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {makeStyles, FormControlLabel} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Home from "./page/home/Home";
import Container from "@material-ui/core/Container";
import SimpleBackdrop from "./components/SimpleBackdrop";
import Demand from "./page/demand/DemandDetail";
import Switch from "@material-ui/core/Switch";
import PrimarySearchAppBar from "./components/PrimarySearchAppBar";
import Typography from "@material-ui/core/Typography";
import SignUp from "./page/user/SignUp";

export default function App() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [dark, setDark] = useState(true);
    const [theme, setTheme] = useState(LightTheme);
    const [msg, setMsg] = useState("全局消息");

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
            localStorage.setItem("dark", true);
            setTheme(DarkTheme);
        } else {
            localStorage.setItem("dark", false);
            setTheme(LightTheme);
        }
    }, [dark]);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div className={dark ? classes.backgroundDark : classes.backgroundLight}>
                    <PrimarySearchAppBar/>
                    <Container className={classes.paddingTop}>
                        <SwitchRoute>
                            <Route path="/" exact>
                                <Home setMsg={setMsg} setLoading={setLoading}/>
                            </Route>
                            <Route path="/demand">
                                <Demand setMsg={setMsg} setLoading={setLoading}/>
                            </Route>
                            <Route path="/signUp">
                                <SignUp/>
                            </Route>
                        </SwitchRoute>
                        <Footer/>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                            className={classes.paddingBottom}
                        >
                            <Typography variant="body2" color="textSecondary">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={() => {
                                                setDark(!dark);
                                                localStorage.setItem("dark", !dark);
                                            }}
                                            color="primary"
                                            checked={dark}
                                        />
                                    }
                                    label="暗黑模式"
                                    labelPlacement="bottom"
                                />
                            </Typography>
                        </Grid>
                        <SimpleBackdrop loading={loading}/>
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