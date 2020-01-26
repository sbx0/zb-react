import React, {useState, useEffect} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {useHistory} from "react-router-dom";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Avatar from "@material-ui/core/Avatar";
import {fetchGet, fetchStatusAlert} from "../tools/Network";
import tools from "../tools/Utils";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {FormControlLabel} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default function PrimarySearchAppBar({dark, setDark, active, changeActive, setLoading, notice}) {
    const classes = useStyles();
    let history = useHistory();
    const [user, setUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    useEffect(() => {
        let url = 'user/base/basic';
        setLoading(true);
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (tools.statusToBool(status)) {
                setUser(json["object"]);
            } else {
                notice(fetchStatusAlert(status), status);
            }
            setLoading(false);
        });
    }, [active]);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    function clearLocalStorage() {
        notice("缓存已清空", 0);
        localStorage.clear();
    }

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

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

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
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={() => {
                handleMobileMenuClose();
                history.push("/");
            }}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>首页</p>
            </MenuItem>
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
                <p>个人资料</p>
            </MenuItem>
            <MenuItem
                onClick={
                    () => {
                        handleMobileMenuClose();
                        let url = 'user/base/logout';
                        setLoading(true);
                        fetchGet(
                            url
                        ).then((json) => {
                            const status = json['status'];
                            if (tools.statusToBool(status)) {
                                changeActive();
                                history.push("/login");
                            } else {
                                notice(fetchStatusAlert(status), status);
                            }
                            setLoading(false);
                        });
                    }
                }
            >
                <IconButton
                    color="secondary"
                >
                    <AccountCircle/>
                </IconButton>
                <p>退出登录</p>
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
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                        <Divider/>
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>

                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                        >
                            <Button variant="contained" color="secondary" onClick={clearLocalStorage}>
                                清除缓存
                            </Button>
                        </Grid>
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
                        智贝
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="搜索"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        {
                            user != null ?
                                <>
                                    <IconButton aria-label="show 4 new mails" color="inherit">
                                        <Badge badgeContent={4} color="secondary">
                                            <MailIcon/>
                                        </Badge>
                                    </IconButton>
                                    <IconButton aria-label="show 17 new notifications" color="inherit">
                                        <Badge badgeContent={17} color="secondary">
                                            <NotificationsIcon/>
                                        </Badge>
                                    </IconButton>
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
                                >登</Avatar>
                            </>
                    }
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
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