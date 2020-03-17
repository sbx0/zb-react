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
        title: '安卓版',
        price: '0.5',
        description: [
            '与网页版同步更新',
            '轻量不占空间',
            '全终端数据同步',
            '免费使用'
        ],
        buttonText: '立即下载',
        buttonVariant: 'outlined',
        url: '/app/zb_app.apk',
    },
    {
        title: '网页版',
        subheader: '最受欢迎',
        price: '0',
        description: [
            '无需安装',
            '即点即用',
            '全终端数据同步',
            '免费使用',
        ],
        buttonText: '马上使用',
        buttonVariant: 'contained',
        url: '/',
    },
    {
        title: '平板版',
        price: '0.5',
        description: [
            '与网页版同步更新',
            '轻量不占空间',
            '全终端数据同步',
            '免费使用'
        ],
        buttonText: '立即下载',
        buttonVariant: 'outlined',
        url: '/app/zb_app_table.apk',
    },
];

export default function ClientApp() {
    const classes = useStyles();
    const theme = useTheme();
    let history = useHistory();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
        defaultMatches: true
    });

    return (
        <React.Fragment>
            <CssBaseline/>
            {/* Hero unit */}
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    智贝
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    线上技术对接与交流平台
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map(tier => (
                        isDesktop || (!isDesktop && tier.title === '安卓版') ?
                            <Grid item key={tier.title} xs={12} sm={tier.title === '平板版' ? 12 : 6} md={4}>
                                <Card>
                                    <CardHeader
                                        title={tier.title}
                                        subheader={tier.subheader}
                                        titleTypographyProps={{align: 'center'}}
                                        subheaderTypographyProps={{align: 'center'}}
                                        action={tier.title === '网页版' ? <StarIcon/> : null}
                                        className={classes.cardHeader}
                                    />
                                    <CardContent>
                                        <div className={classes.cardPricing}>
                                            <Typography component="h2" variant="h3" color="textPrimary">
                                                {tier.price}
                                            </Typography>
                                            <Typography variant="h6" color="textSecondary">
                                                &nbsp;MB
                                            </Typography>
                                        </div>
                                        <ul>
                                            {tier.description.map(line => (
                                                <Typography component="li" variant="subtitle1" align="center"
                                                            key={line}>
                                                    {line}
                                                </Typography>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            fullWidth
                                            variant={tier.buttonVariant}
                                            color="primary"
                                            onClick={() => {
                                                if (tier.url !== '/') {
                                                    window.open(tier.url);
                                                } else {
                                                    history.push('/');
                                                }
                                            }}
                                        >
                                            {tier.buttonText}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            :
                            <Box key={tier.title}></Box>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}