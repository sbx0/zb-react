import React, {useState} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FlagIcon from '@material-ui/icons/Flag';
import HomeIcon from '@material-ui/icons/Home';

export default withRouter(GlobalBottomNavigation);

GlobalBottomNavigation.propTypes = {
    location: PropTypes.object,
};

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
                    let path = '/';
                    switch (newValue) {
                        case 0:
                            path = '/memory';
                            break;
                        case 2:
                            path = '/task';
                            break;
                        default:
                            path = '/';
                            break;
                    }
                    setValue(newValue);
                    setPath(path);
                }}
                showLabels
            >
                <BottomNavigationAction label="首页" icon={<FavoriteIcon/>}/>
                <BottomNavigationAction label="首页" icon={<HomeIcon/>}/>
                <BottomNavigationAction label="首页" icon={<FlagIcon/>}/>
                {/* <BottomNavigationAction label={i18N.beta} icon={<AdbIcon />} /> */}
            </BottomNavigation>
        </>
    );
}

RenderRedirect.propTypes = {
    path: PropTypes.string,
};

function RenderRedirect(props) {
    return <Redirect to={props.path}/>;
}

function pathnameToIndex(path) {
    switch (path) {
        case '/memory':
            return 0;
        case '/task':
            return 2;
        default:
            return 1;
    }
}