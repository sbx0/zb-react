import React, {useState} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ChatIcon from '@material-ui/icons/Chat';
import PageViewIcon from '@material-ui/icons/Pageview';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

export default withRouter(GlobalBottomNavigation);

function GlobalBottomNavigation(props) {
    const [value, setValue] = useState(pathnameToIndex(props.location.pathname));
    const [path, setPath] = useState(props.location.pathname);
    return (
        <>
            <RenderRedirect
                value={value}
                path={path}
            />
            <BottomNavigation
                value={value}
                onChange={(_event, newValue) => {
                    let pathNew = '/';
                    switch (newValue) {
                        case 0:
                            pathNew = '/home';
                            break;
                        case 1:
                            pathNew = '/market/technical/achievements';
                            break;
                        case 2:
                            pathNew = '/chat/public';
                            break;
                        case 3:
                            pathNew = '/user';
                            break;
                        default:
                            pathNew = '/';
                            break;
                    }
                    setPath(pathNew);
                    setValue(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction label="首页" icon={<HomeIcon/>}/>
                <BottomNavigationAction label="成果" icon={<PageViewIcon/>}/>
                <BottomNavigationAction label="聊天" icon={<ChatIcon/>}/>
                <BottomNavigationAction label="我的" icon={<AccountBoxIcon/>}/>
                {/* <BottomNavigationAction label={i18N.beta} icon={<AdbIcon />} /> */}
            </BottomNavigation>
        </>
    );
}

function RenderRedirect(props) {
    return <Redirect to={props.path}/>;
}

function pathnameToIndex(path) {
    switch (path) {
        case '/home':
            return 0;
        case '/market/technical/achievements':
            return 1;
        case '/chat/public':
            return 2;
        case '/user':
            return 3;
        default:
            return 0;
    }
}