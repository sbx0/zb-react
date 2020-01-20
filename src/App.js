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
import Home from "./page/home/Home";
import Container from "@material-ui/core/Container";
import SimpleBackdrop from "./components/SimpleBackdrop";

export default function App() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [dark, setDark] = useState(false);
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
                <Container className={dark ? classes.backgroundDark : classes.backgroundLight}>
                    <SimpleBackdrop loading={loading}/>
                    <Route path="/" exact>
                        <Home setMsg={setMsg} setLoading={setLoading}/>
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
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    );
}
const useStyles = makeStyles({
    backgroundDark: {
        backgroundColor: "#333333",
    },
    backgroundLight: {
        backgroundColor: "#f5f5f5",
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
    },
});