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
    const [classificationOne, setClassificationOne] = useState(null);
    const [classificationTwo, setClassificationTwo] = useState(null);
    const [classificationTwoActive, setClassificationTwoActive] = useState(false);
    const [classificationId, setClassificationId] = useState(null);
    const [addressId, setAddressId] = useState(null);
    const [provinceActive, setProvinceActive] = useState(false);
    const [cityActive, setCityActive] = useState(false);
    const [country, setCountry] = useState(null);
    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [maturity, setMaturity] = useState(null);
    const [cooperationMethod, setCooperationMethod] = useState(null);

    useEffect(() => {
        setClassificationTwoActive(!classificationTwoActive);
        if (classificationOne !== null)
            setClassificationId(classificationOne);
        setClassificationTwo(null);
    }, [classificationOne]);

    useEffect(() => {
        if (classificationTwo !== null)
            setClassificationId(classificationTwo);
    }, [classificationTwo]);

    useEffect(() => {
        setProvinceActive(!provinceActive);
        if (country !== null)
            setAddressId(country)
    }, [country]);

    useEffect(() => {
        setCityActive(!cityActive);
        if (province !== null)
            setAddressId(province)
    }, [province]);

    useEffect(() => {
        if (city !== null)
            setAddressId(city)
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
                        <Grid item xs={2}>
                            <Typography
                                variant="inherit"
                            >
                                地区({addressId})：
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
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
                        <Grid item xs={2}>
                            <Typography
                                variant="inherit"
                            >
                                领域({classificationId})：
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
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
                        <Grid item xs={2}>
                            <Typography
                                variant="inherit"
                            >
                                成熟度({maturity})和合作方式({cooperationMethod})：
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
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