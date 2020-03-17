import {createMuiTheme} from "@material-ui/core/styles";

export const DarkTheme = createMuiTheme({
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
                backgroundColor: 'rgba(68, 68, 68, 0.8)'
            },
            elevation1: {
                boxShadow: '0 2px 3px rgba(0,0,0,.1)',
            },
        },
        MuiBottomNavigation: {
            root: {
                background: 'linear-gradient(45deg, rgba(80, 80, 80, 0.7) 30%, rgba(90, 89, 89, 0.32) 90%)',
                border: 0,
                boxShadow: 'none',
                backgroundColor: 'none',
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