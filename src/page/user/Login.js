import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {fetchPost, fetchStatus, fetchStatusAlert, returnStatus} from "../../tools/Network";

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

export default function Login() {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    async function submitData() {
        fetchPost('user/base/login', values).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                // todo 登录成功后跳转
            }
            alert(fetchStatusAlert(status));
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
                    登录
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="邮箱"
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
                                label="密码"
                                value={values.password}
                                onChange={handleChange('password')}
                                autoComplete="current-password"
                                type="password"
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="记住我（请勿在公共机器中选中）"
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
                        登录
                    </Button>
                </form>
            </div>
        </Container>
    );
}