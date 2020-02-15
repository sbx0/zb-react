import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import "../../i18N/i18N"

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useHistory, useLocation, Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {fetchPost, fetchStatus, fetchStatusAlert, returnStatus} from "../../tools/Network";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import KindSelect from "./components/KindSelect/KindSelect";
import MarkdownEditor from "./components/MarkdownEditor/MarkdownEditor";

export default function Certification({setLoading, notice}) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    const [kind, setKind] = useState(0)
    const [material, setMaterial] = useState(t("认证申请材料格式示例"));
    const [values, setValues] = useState({
        kind: 0,
        material: '',
    });

    useEffect(() => {
        values.kind = kind;
        setValues(values);
    }, [kind])

    useEffect(() => {
        values.material = material;
        setValues(values);
    }, [material])

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    async function submitData() {
        setLoading(true);
        fetchPost('user/certification/submit', values).then((json) => {
            setLoading(false);
            const status = json['status'];
            notice(t(fetchStatusAlert(status)), status);
            if (fetchStatus(status)) {
                history.push("/user");
            }
        }).catch((error) => {
            notice(error.toString(), -1);
            setLoading(false);
        });
    }

    return (
        <Container component="main">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t("申请认证")}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <KindSelect
                                kind={kind}
                                setKind={setKind}
                                notice={notice}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MarkdownEditor value={material} setValue={setMaterial}/>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label={t("同意智贝的协议")}
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
                        {t("提交")}
                    </Button>
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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
