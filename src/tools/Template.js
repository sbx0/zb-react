import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {fetchGet, fetchPost, fetchStatus, fetchStatusAlert, returnStatus} from "Network";
import tools from "./Utils";

export function FormTemplate({setLoading, setMsg}) {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        let url = '';
        setLoading(true);
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (tools.statusToBool(status)) {
                localStorage.setItem(url + tools.cacheTimeStamp(1), JSON.stringify(json.objects));
                setMsg("加载成功");
            } else {
                setMsg(tools.statusToAlert(status));
            }
            setLoading(false);
        });
    }, [size, setLoading, setMsg]);

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    async function submitData() {
        fetchPost('temp/test', values).then((json) => {
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


const useStyles = makeStyles(theme => ({
    center: {
        margin: '5px auto',
    }
}));