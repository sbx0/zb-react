import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';
import Footer from './components/Footer';
import GlobalBottomNavigation from './components/GlobalBottomNavigation';

import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {makeStyles, FormControlLabel} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Home from "./page/home/Home";

export default function App() {
    const classes = useStyles();
    const [dark, setDark] = useState(true);
    const [theme, setTheme] = useState(LightTheme);
    const [msg, setMsg] = useState("全局消息");

    useEffect(() => {
        if (dark) {
            setTheme(DarkTheme);
        } else {
            setTheme(LightTheme);
        }
    }, [dark]);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Paper
                    square={true}
                    elevation={0}
                    className={classes.paper}
                >
                    {/*<h1>{msg}</h1>*/}
                    <Route path="/" exact>
                        <Home setMsg={setMsg}/>
                    </Route>
                    <Footer/>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        className={classes.marginBottom}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={() => setDark(!dark)}
                                    color="primary"
                                    checked={dark}
                                />
                            }
                            label="暗黑模式"
                            labelPlacement="bottom"
                        />
                    </Grid>
                    <div className={classes.bottom}/>
                    <GlobalBottomNavigation/>
                </Paper>
            </BrowserRouter>
        </ThemeProvider>
    );
}
const useStyles = makeStyles({
    paper: {
        minHeight: '100vh',
    },
    bottom: {
        height: 56,
    },
    marginBottom: {
        marginBottom: 20,
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
        MuiPaper: {
            root: {
                color: '#c6c6c6',
            },
        },
        MuiTypography: {
            colorTextPrimary: {
                color: '#d4d4d4',
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
        MuiCard: {
            root: {
                boxShadow: 'none',
            },
        },
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
        MuiCard: {
            root: {
                boxShadow: 'none',
            },
        },
    },
});