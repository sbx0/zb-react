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
import {makeStyles} from '@material-ui/core';
import Container from "@material-ui/core/Container";
import {fetchGet, fetchStatus, fetchStatusAlert} from "./tools/Network";

export default function App() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [dark, setDark] = useState(true);
    const [theme, setTheme] = useState(LightTheme);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [severity, setSeverity] = useState("success");
    const [active, setActive] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        login();
    }, [active]);

    function login() {
        let url = 'user/base/basic';
        setLoading(true);
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                let user = json["object"];
                if (user['avatar'] !== 'avatar.jpg') {
                    user['avatar'] = localStorage.getItem("server_config") + user['avatar'];
                }
                setUser(json["object"]);
            } else {
                notice(fetchStatusAlert(status), status);
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
                    <SearchAppBar
                        user={user}
                        notice={notice}
                        active={active}
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
                color: '#ebebeb',
            },
        },
        MuiPaper: {
            root: {
                color: '#ebebeb',
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