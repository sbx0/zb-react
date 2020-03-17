import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {useMediaQuery} from "@material-ui/core";
import {useTheme} from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import {useHistory} from "react-router-dom";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeveloperModeIcon from "@material-ui/icons/DeveloperMode";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import ListItem from "@material-ui/core/ListItem";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(theme => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

const tiers = [
    {
        title: 'react',
        version: '16.13.0',
        url: '',
    },
    {
        title: '@material-ui',
        version: '4.9.5',
        url: '',
    },
    {
        title: 'material-table',
        version: '1.57.2',
        url: '',
    },
    {
        title: 'react-chat-ui',
        version: '0.3.2',
        url: '',
    },
    {
        title: 'react-dropzone',
        version: '10.2.1',
        url: '',
    },
    {
        title: 'react-i18next',
        version: '11.3.3',
        url: '',
    },
    {
        title: 'react-markdown',
        version: '4.3.1',
        url: '',
    },
    {
        title: 'react-mde',
        version: '8.1.0',
        url: '',
    },
    {
        title: 'react-router-dom',
        version: '5.1.2',
        url: '',
    },
    {
        title: 'react-stomp',
        version: '4.3.0',
        url: '',
    },
    {
        title: 'recharts',
        version: '1.8.5',
        url: '',
    },
    {
        title: 'socket.io-client',
        version: '2.3.0',
        url: '',
    },
    {
        title: 'websocket',
        version: '1.0.31',
        url: '',
    },
];

export default function About() {
    const {t} = useTranslation();
    const classes = useStyles();
    const theme = useTheme();
    let history = useHistory();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true
    });

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    关于智贝
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    线上技术对接与交流平台
                </Typography>
            </Container>
            <Container maxWidth="md" component="main">
                <Grid container>
                    <List subheader={<ListSubheader>{t("开源许可")}</ListSubheader>}>
                        {tiers.map(tier => (
                            <ListItem>
                                <ListItemIcon>
                                    <DeveloperModeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={tier.title + ' ' + tier.version}/>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Container>
        </React.Fragment>
    );
}