import {createMuiTheme} from "@material-ui/core/styles";

export const LightTheme = createMuiTheme({
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
        MuiPaper: {
            root: {
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
            },
            elevation1: {
                boxShadow: '0 2px 3px rgba(0,0,0,.1)',
            },
        },
        MuiTypography: {
            colorTextSecondary: {
                color: 'rgba(0, 0, 0, 0.54)'
            }
        }
    },
});