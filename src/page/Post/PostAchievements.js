import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import "../../i18N/i18N"

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useHistory, useLocation, Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {fetchPost, fetchStatus, fetchStatusAlert, returnStatus} from "../../tools/Network";
import MarkdownEditor from "../../page/Certification/components/MarkdownEditor/MarkdownEditor";
import TextField from "@material-ui/core/TextField";
import CommonSelect from "../../Components/CommonSelect";
import CommonUpload from "../../Components/CommonUpload";

export default function PostAchievements({setLoading, notice}) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    const [material, setMaterial] = useState('这里简单介绍你的技术成果');
    const [maturity, setMaturity] = useState('');
    const [country, setCountry] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [cooperationMethod, setCooperationMethod] = useState('');
    const [classificationOne, setClassificationOne] = useState('');
    const [classificationTwo, setClassificationTwo] = useState('');
    const [classificationTwoActive, setClassificationTwoActive] = useState(false);
    const [provinceActive, setProvinceActive] = useState(false);
    const [cityActive, setCityActive] = useState(false);
    const [fileUrl, setFileUrl] = useState('/avatar.jpg');
    const [values, setValues] = useState({
        name: '',
        price: '',
        context: '',
        cover: '',
        maturity: '',
        cooperationMethod: '',
        classificationId: '',
        addressId: '',
    });

    useEffect(() => {
        setValues({...values, 'cover': fileUrl});
    }, [fileUrl]);

    useEffect(() => {
        setClassificationTwoActive(!classificationTwoActive);
        setValues({...values, 'classificationId': classificationOne});
    }, [classificationOne]);

    useEffect(() => {
        setValues({...values, 'classificationId': classificationTwo});
    }, [classificationTwo]);

    useEffect(() => {
        setProvinceActive(!provinceActive);
        setValues({...values, 'addressId': country});
    }, [country]);

    useEffect(() => {
        setCityActive(!cityActive);
        setValues({...values, 'addressId': province});
    }, [province]);

    useEffect(() => {
        setValues({...values, 'addressId': city});
    }, [city]);

    useEffect(() => {
        setValues({...values, 'cooperationMethod': cooperationMethod});
    }, [cooperationMethod]);

    useEffect(() => {
        setValues({...values, 'maturity': maturity});
    }, [maturity]);

    useEffect(() => {
        setValues({...values, 'context': material});
    }, [material]);

    useEffect(() => {
    }, [values]);

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    async function submitData() {
        setLoading(true);
        fetchPost('technical/achievements/post', values).then((json) => {
            setLoading(false);
            const status = json['status'];
            notice(t(fetchStatusAlert(status)), status);
            if (fetchStatus(status)) {
                history.push("/home");
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
                    {t("发布技术成果")}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CommonUpload
                                notice={notice}
                                setFileUrl={setFileUrl}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CommonSelect
                                url={'/technical/classification/father'}
                                title={'技术分类1级'}
                                notice={notice}
                                selected={classificationOne}
                                setSelected={setClassificationOne}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CommonSelect
                                url={'/technical/classification/son?fatherId=' + classificationOne}
                                title={'技术分类2级'}
                                active={classificationTwoActive}
                                notice={notice}
                                selected={classificationTwo}
                                setSelected={setClassificationTwo}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CommonSelect
                                url={'/address/base/father'}
                                title={'国家'}
                                notice={notice}
                                selected={country}
                                setSelected={setCountry}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CommonSelect
                                url={'/address/base/son?fatherId=' + country}
                                active={provinceActive}
                                title={'省'}
                                notice={notice}
                                selected={province}
                                setSelected={setProvince}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <CommonSelect
                                url={'/address/base/son?fatherId=' + province}
                                active={cityActive}
                                title={'市'}
                                notice={notice}
                                selected={city}
                                setSelected={setCity}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CommonSelect
                                url={'/technical/achievements/maturity/list'}
                                title={'成熟度'}
                                notice={notice}
                                selected={maturity}
                                setSelected={setMaturity}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CommonSelect
                                url={'/technical/achievements/cooperationMethod/list'}
                                title={'合作方式'}
                                notice={notice}
                                selected={cooperationMethod}
                                setSelected={setCooperationMethod}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={t("成果名称")}
                                value={values.name}
                                onChange={handleChange('name')}
                                variant="outlined"
                                required
                                fullWidth
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={t("交易价格")}
                                value={values.price}
                                onChange={handleChange('price')}
                                variant="outlined"
                                required
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={t("封面")}
                                value={values.cover}
                                onChange={handleChange('cover')}
                                variant="outlined"
                                required
                                fullWidth
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
