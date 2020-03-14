import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../i18N/"

import {
    useParams
} from "react-router-dom";

import {fetchGet, fetchStatus, fetchStatusAlert} from "../../tools/Network";

import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CommonSelect from "../../Components/CommonSelect";
import TechnicalAchievementList from "./TechnicalAchievementList";

const useStyles = makeStyles(theme => ({
    mt: {
        marginTop: '10px'
    },
    mb: {
        marginBottom: '10px'
    }
}));

export default function TechnicalAchievementMarket({setLoading, notice}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let {key} = useParams();
    const [classificationOne, setClassificationOne] = useState('');
    const [classificationTwo, setClassificationTwo] = useState('');
    const [classificationTwoActive, setClassificationTwoActive] = useState(false);
    const [classificationId, setClassificationId] = useState('');
    const [addressId, setAddressId] = useState('');
    const [provinceActive, setProvinceActive] = useState(false);
    const [cityActive, setCityActive] = useState(false);
    const [country, setCountry] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [maturity, setMaturity] = useState('');
    const [cooperationMethod, setCooperationMethod] = useState('');
    const [active, setActive] = useState(false);

    function classificationSelect(id) {
        let url = 'technical/classification/sonToFather?sonId=' + id;
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                const objects = json['objects'].reverse();
                setClassificationOne(objects[0]['id']);
                if (objects.length > 1) setClassificationTwo(objects[1]['id']);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        }).finally(() => {

        })
    }

    function addressSelect(id) {
        let url = 'address/base/sonToFather?sonId=' + id;
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                const objects = json['objects'].reverse();
                setCountry(objects[0]['id']);
                if (objects.length > 1) setProvince(objects[1]['id']);
                if (objects.length > 2) setCity(objects[2]['id']);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        }).finally(() => {

        })
    }

    useEffect(() => {
        if (key != null && key != undefined) {
            let map = key.split(':');
            if (map[0] == 'classificationId') {
                setClassificationId(map[1]);
                classificationSelect(map[1]);
            } else if (map[0] == 'addressId') {
                setAddressId(map[1]);
                addressSelect(map[1]);
            }
        }
        setActive(true);
    }, []);

    useEffect(() => {
        setClassificationTwoActive(!classificationTwoActive);
        if (classificationOne !== '') {
            setClassificationId(classificationOne);
        }
    }, [classificationOne]);

    useEffect(() => {
        if (classificationTwo !== '') {
            setClassificationId(classificationTwo);
        }
    }, [classificationTwo]);

    useEffect(() => {
        if (country !== '') {
            setAddressId(country);
            setProvinceActive(!provinceActive);
        }
    }, [country]);

    useEffect(() => {
        if (province !== '') {
            setAddressId(province);
            setCityActive(!cityActive);
        }
    }, [province]);

    useEffect(() => {
        if (city !== '') {
            setAddressId(city);
        }
    }, [city]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        variant="h5"
                        color="textSecondary"
                        align="center"
                    >
                        技术成果市场
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant="inherit"
                            >
                                地区：{addressId}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
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
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant="inherit"
                            >
                                领域：{classificationId}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
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
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant="inherit"
                            >
                                成熟度和合作方式：{maturity}{cooperationMethod}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container>
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
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TechnicalAchievementList
                        active={active}
                        maturity={maturity}
                        cooperationMethod={cooperationMethod}
                        addressId={addressId}
                        classificationId={classificationId}
                        notice={notice}
                        setLoading={setLoading}
                    />
                </Grid>
            </Grid>
        </>
    );
}