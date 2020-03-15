import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import "../../i18N/i18N"

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useHistory, Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {fetchStatus, fetchStatusAlert, postUserBaseLogin} from "../../tools/Network";

export default function Login({setLoading, changeActive, notice}) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    let history = useHistory();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    async function submitData() {
        setLoading(true);
        postUserBaseLogin(values).then((json) => {
            setLoading(false);
            const status = json['status'];
            if (fetchStatus(status)) {
                changeActive();
                history.push("/");
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
            setLoading(false);
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t("登录")}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label={t("邮箱")}
                                value={values.email}
                                onChange={handleChange('email')}
                                autoComplete="email"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={t("密码")}
                                value={values.password}
                                onChange={handleChange('password')}
                                autoComplete="current-password"
                                type="password"
                                variant="outlined"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label={t("记住我")}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => submitData()}
                    >
                        {t("登录")}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/register">
                                {t("限时开放注册中")}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}


const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
