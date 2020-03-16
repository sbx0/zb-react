import React, {useState, useEffect} from 'react';
import {
    BrowserRouter
} from 'react-router-dom';
import './App.css';
import {
    NoticeSnackbars,
    Footer,
    SearchAppBar,
    LoadingBackdrop,
} from "./Components";
import RoutesConfig from "./config/RoutesConfig";
import utils from "./tools/Utils"
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {makeStyles, useMediaQuery} from '@material-ui/core';
import Container from "@material-ui/core/Container";
import {fetchStatus, fetchStatusAlert, getUserBaseBasic} from "./tools/Network";
import GlobalBottomNavigation from "./Components/GlobalBottomNavigation";
import {useTranslation} from "react-i18next";

export default function App() {
    const {t} = useTranslation();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [dark, setDark] = useState(true);
    const [theme, setTheme] = useState(LightTheme);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState("success");
    const [active, setActive] = useState(false);
    const [user, setUser] = useState(null);
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true
    });

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

    useEffect(() => {
        login();
    }, [active]);

    function login() {
        setLoading(true);
        getUserBaseBasic().then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                let user = json["object"];
                if (user['avatar'] !== 'avatar.ico') {
                    user['avatar'] = localStorage.getItem("server_config") + user['avatar'];
                }
                setUser(json["object"]);
            } else {
                notice(t(fetchStatusAlert(status)), status);
                setUser(null);
            }
            setLoading(false);
        }).catch((error) => {
            notice(error.toString(), -1);
            setLoading(false);
        });
    }

    function changeActive() {
        setActive(!active);
    }

    function checkIsNight() {
        let autoDarkMode = localStorage.getItem("auto_dark_mode");
        if (autoDarkMode != null && autoDarkMode) {
            let isNight = utils.isNight();
            if (isNight) {
                localStorage.setItem("dark", "true");
                setTheme(DarkTheme);
                setDark(true);
            } else {
                localStorage.setItem("dark", "false");
                setTheme(LightTheme);
                setDark(false);
            }
        } else {
            localStorage.setItem("auto_dark_mode", "false");
        }
    }

    useEffect(() => {
        setInterval(
            () => checkIsNight(),
            1000 * 60 * 30,
        );
    }, []);

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

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div className={dark ? classes.backgroundDark : classes.backgroundLight}>
                    <SearchAppBar
                        user={user}
                        notice={notice}
                        dark={dark}
                        setLoading={setLoading}
                        setDark={setDark}
                        changeActive={changeActive}
                    />
                    <Container className={classes.paddingTop}>
                        <RoutesConfig
                            user={user}
                            active={active}
                            notice={notice}
                            loading={loading}
                            setLoading={setLoading}
                            changeActive={changeActive}
                        />
                        <Footer/>
                        <LoadingBackdrop loading={loading}/>
                        <NoticeSnackbars
                            msg={msg}
                            severity={severity}
                            open={open}
                            setOpen={setOpen}
                        />
                        {
                            isDesktop ?
                                <></>
                                :
                                <>
                                    <div className={classes.bottom}/>
                                    <GlobalBottomNavigation/>
                                </>
                        }
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
        backgroundColor: "#22303f",
    },
    backgroundLight: {
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#e2e2e2",
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
                color: '#9caec7',
            },
            colorTextPrimary: {
                color: '#bdc7d6'
            }
        },
        MuiPaper: {
            root: {
                color: '#ebebeb',
            },
        },
        MuiBottomNavigation: {
            root: {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                background: 'linear-gradient(45deg, rgba(92, 107, 192, 0.47) 30%, rgba(77, 96, 189, 0.48) 90%)',
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.3)',
                width: '100%',
                margin: '0 auto',
                position: 'fixed',
                bottom: 0,
                right: 0,
            },
        },
        MuiAppBar: {
            colorPrimary: {
                color: '#a9bcd6',
                backgroundColor: '#18222d'
            }
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
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.83) 30%, rgba(255, 255, 255, 0.82) 90%)',
                    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.3)',
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
            },
            //.MuiTypography-colorTextSecondary
            MuiPaper: {
                elevation1: {
                    boxShadow: '0 2px 3px rgba(0,0,0,.1)',
                },
            },
            MuiTypography: {
                colorTextSecondary: 'rgb(51, 51, 51)'
            }
        },
    })
;