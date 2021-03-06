import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../i18N"

import {useHistory, useLocation} from "react-router-dom";

import {
    fetchStatus,
    fetchStatusAlert,
    getUserBaseLogout,
    getUserBaseHeartbeat,
    getStatisticalUserReport
} from "../tools/Network";

import {fade, makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import HomeIcon from '@material-ui/icons/Home';
import GTranslateRoundedIcon from '@material-ui/icons/GTranslateRounded';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InputIcon from '@material-ui/icons/Input';
import AdbIcon from '@material-ui/icons/Adb';
import ClearIcon from '@material-ui/icons/Clear';
import GetAppIcon from '@material-ui/icons/GetApp';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {FormControlLabel} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import PostAddIcon from '@material-ui/icons/PostAdd';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import LanguageSelect from "./LanguageSelect";

export default function SearchAppBar(
    {
        user,
        dark,
        setDark,
        changeActive,
        setLoading,
        notice
    }
) {
    const {t} = useTranslation();
    let location = useLocation();
    const classes = useStyles();
    let history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const isAdmin = location.pathname.substr(0, 6) === "/admin";

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    useEffect(() => {
        heartbeat();
        setInterval(
            () => heartbeat(),
            1000 * 60 * 5,
        );
    }, []);

    useEffect(() => {
        report();
        setInterval(
            () => report(),
            1000 * 60 * 60,
        );
    }, []);

    function report() {
        getStatisticalUserReport().then((json) => {
            const status = json['status'];
            if (!fetchStatus(status)) {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
    }

    function heartbeat() {
        getUserBaseHeartbeat().then((json) => {
            const status = json['status'];
            if (!fetchStatus(status)) {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
    }

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
        history.push("/user");
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {/*<MenuItem>*/}
            {/*    <IconButton aria-label="show 4 new mails" color="inherit">*/}
            {/*        <Badge badgeContent={4} color="secondary">*/}
            {/*            <MailIcon/>*/}
            {/*        </Badge>*/}
            {/*    </IconButton>*/}
            {/*    <p>{t("消息")}</p>*/}
            {/*</MenuItem>*/}
            {/*<MenuItem>*/}
            {/*    <IconButton aria-label="show 11 new notifications" color="inherit">*/}
            {/*        <Badge badgeContent={11} color="secondary">*/}
            {/*            <NotificationsIcon/>*/}
            {/*        </Badge>*/}
            {/*    </IconButton>*/}
            {/*    <p>{t("通知")}</p>*/}
            {/*</MenuItem>*/}
            <MenuItem onClick={() => {
                handleMobileMenuClose();
                history.push("/post");
            }}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <PostAddIcon/>
                </IconButton>
                <p>{t("发布")}</p>
            </MenuItem>
            {/*<MenuItem onClick={() => {*/}
            {/*    handleMobileMenuClose();*/}
            {/*    history.push("/group");*/}
            {/*}}>*/}
            {/*    <IconButton*/}
            {/*        aria-label="account of current user"*/}
            {/*        aria-controls="primary-search-account-menu"*/}
            {/*        aria-haspopup="true"*/}
            {/*        color="inherit"*/}
            {/*    >*/}
            {/*        <GroupIcon/>*/}
            {/*    </IconButton>*/}
            {/*    <p>{t("群组")}</p>*/}
            {/*</MenuItem>*/}
            <MenuItem onClick={() => {
                handleMobileMenuClose();
                history.push("/user");
            }}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>{t("个人资料")}</p>
            </MenuItem>
            <MenuItem
                onClick={
                    () => {
                        handleMobileMenuClose();
                        setLoading(true);
                        getUserBaseLogout().then((json) => {
                            const status = json['status'];
                            if (fetchStatus(status)) {
                                changeActive();
                                history.push("/login");
                            } else {
                                notice(t(fetchStatusAlert(status)), status);
                            }
                            setLoading(false);
                        });
                    }
                }
            >
                <IconButton>
                    <ExitToAppIcon/>
                </IconButton>
                <p>{t("退出登录")}</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" color="primary">
                <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
                    <div
                        className={classes.list}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            <ListItem
                                button
                                onClick={() => {
                                    history.push("/beta");
                                }}
                            >
                                <ListItemIcon><AdbIcon/></ListItemIcon>
                                <ListItemText primary={t("开发者选项")}/>
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => {
                                    history.push("/app");
                                }}
                            >
                                <ListItemIcon><GetAppIcon/></ListItemIcon>
                                <ListItemText primary={t("下载客户端")}/>
                            </ListItem>
                            <ListItem
                                button
                                onClick={() => {
                                    setDark(!dark);
                                    localStorage.setItem("dark", !dark + "");
                                }}
                            >
                                <ListItemIcon><NightsStayIcon/></ListItemIcon>
                                <ListItemText primary={
                                    dark ? t('夜间模式') + ' ' + t('已开启') : t('夜间模式') + ' ' + t('已关闭')
                                }/>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><GTranslateRoundedIcon/></ListItemIcon>
                                <ListItemText primary={<LanguageSelect/>}/>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        noWrap
                        onClick={() => history.push("/login")}
                    >
                        {t('智贝')}
                    </Typography>
                    {/*<div className={classes.search}>*/}
                    {/*    <div className={classes.searchIcon}>*/}
                    {/*        <SearchIcon/>*/}
                    {/*    </div>*/}
                    {/*    <InputBase*/}
                    {/*        placeholder={t("搜索")}*/}
                    {/*        classes={{*/}
                    {/*            root: classes.inputRoot,*/}
                    {/*            input: classes.inputInput,*/}
                    {/*        }}*/}
                    {/*        inputProps={{'aria-label': 'search'}}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        {
                            user != null ?
                                <>
                                    {/*<IconButton aria-label="show 4 new mails" color="inherit">*/}
                                    {/*    <Badge badgeContent={4} color="secondary">*/}
                                    {/*        <MailIcon/>*/}
                                    {/*    </Badge>*/}
                                    {/*</IconButton>*/}
                                    {/*<IconButton aria-label="show 17 new notifications" color="inherit">*/}
                                    {/*    <Badge badgeContent={17} color="secondary">*/}
                                    {/*        <NotificationsIcon/>*/}
                                    {/*    </Badge>*/}
                                    {/*</IconButton>*/}
                                </>
                                :
                                <></>
                        }
                    </div>
                    {
                        user != null ?
                            <>
                                <Avatar
                                    className={classes.avatar}
                                    src={user.avatar}
                                    onClick={handleMobileMenuOpen}
                                />
                            </>
                            :
                            <>
                                <Avatar
                                    className={classes.avatar}
                                    onClick={() => history.push("/login")}
                                >{t("登")}</Avatar>
                            </>
                    }
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    avatar: {
        width: 30,
        height: 30,
        marginLeft: 10,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));