import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {useHistory, useLocation} from "react-router-dom";
import tools from "../../../../tools/Utils";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        margin: '0 auto',
    },
    img: {
        margin: '0 auto',
        display: 'block',
        minWidth: 260,
        maxWidth: '80vw',
        maxHeight: 120,
        objectFit: 'cover',
    },
}));

export default function ShowCard({title, img, price, time, desc, url}) {
    const classes = useStyles();
    let location = useLocation();
    let history = useHistory();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item className={classes.image}>
                        <ButtonBase
                            onClick={() => {
                                history.push(url);
                            }}
                        >
                            <img className={classes.img} alt="complex" src={img}/>
                        </ButtonBase>
                    </Grid>
                    <Grid item container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {title}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {tools.timeShow(time)}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{price + "￥"}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}