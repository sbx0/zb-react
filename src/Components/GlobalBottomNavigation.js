import React, {useState, useEffect} from 'react';
import {Redirect, useHistory, withRouter} from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ChatIcon from '@material-ui/icons/Chat';
import PageViewIcon from '@material-ui/icons/Pageview';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

export default withRouter(GlobalBottomNavigation);

function GlobalBottomNavigation(props) {
    const [value, setValue] = useState(0);
    let history = useHistory();
    const navs = [
        {
            index: 0,
            path: '/home',
            icon: <HomeIcon/>,
            label: '首页',
        },
        {
            index: 1,
            path: '/market/technical/achievements',
            icon: <PageViewIcon/>,
            label: '成果',
        },
        {
            index: 2,
            path: '/chat/public',
            icon: <ChatIcon/>,
            label: '聊天',
        },
        {
            index: 3,
            path: '/user',
            icon: <AccountBoxIcon/>,
            label: '我的',
        },
    ];

    useEffect(() => {
        setValue(pathnameToIndex(props.location.pathname, navs));
    }, [props.location.pathname]);

    function pathnameToIndex(path, navs) {
        for (let i = 0; i < navs.length; i++) {
            if (navs[i].path === path) return navs[i].index;
        }
        return -1;
    }

    return (
        <>
            <BottomNavigation
                value={value}
                onChange={(_event, newValue) => {
                    let pathNew = '/'
                    for (let i = 0; i < navs.length; i++) {
                        if (navs[i].index === newValue) pathNew = navs[i].path;
                    }
                    history.push(pathNew);
                }}
                showLabels
            >
                {
                    navs.map((nav) =>
                        <BottomNavigationAction
                            key={nav.index}
                            label={nav.label}
                            icon={nav.icon}
                        />)
                }
            </BottomNavigation>
        </>
    );
}