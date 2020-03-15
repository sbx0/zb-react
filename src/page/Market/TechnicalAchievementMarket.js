import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "../../i18N/"
import {
    fetchStatus,
    fetchStatusAlert,
    getAddressBaseFather,
    getAddressBaseSon,
    getAddressBaseSonToFather, getTechnicalAchievementsCooperationMethodList,
    getTechnicalAchievementsMaturityList,
    getTechnicalClassificationFather,
    getTechnicalClassificationSon,
    getTechnicalClassificationSonToFather
} from "../../tools/Network";
import CommonSelect from "../../Components/CommonSelect";
import TechnicalAchievementList from "./TechnicalAchievementList";

export default function TechnicalAchievementMarket({setLoading, notice}) {
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
    const [lock, setLock] = useState(true);

    function classificationSelect(id) {
        getTechnicalClassificationSonToFather({
            sonId: id
        }).then((json) => {
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
        getAddressBaseSonToFather({
            sonId: id
        }).then((json) => {
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
        if (key !== null && key !== undefined) {
            let map = key.split(':');
            if (map[0] === 'classificationId') {
                setClassificationId(map[1]);
                classificationSelect(map[1]);
            } else if (map[0] === 'addressId') {
                setAddressId(map[1]);
                addressSelect(map[1]);
            } else if (map[0] === 'maturityId') {
                setMaturity(map[1]);
            } else if (map[0] === 'cooperationMethodId') {
                setCooperationMethod(map[1]);
            }
        }
        setActive(true);
    }, []);

    useEffect(() => {
        setClassificationTwoActive(!classificationTwoActive);
        if (classificationOne !== '') {
            if (!lock)
                setClassificationId(classificationOne);
        }
    }, [classificationOne]);

    useEffect(() => {
        if (classificationTwo !== '') {
            if (!lock)
                setClassificationId(classificationTwo);
        }
    }, [classificationTwo]);

    useEffect(() => {
        if (country !== '') {
            setProvinceActive(!provinceActive);
            if (!lock)
                setAddressId(country);
        }
    }, [country]);

    useEffect(() => {
        if (province !== '') {
            setCityActive(!cityActive);
            if (!lock)
                setAddressId(province);
        }
    }, [province]);

    useEffect(() => {
        if (city !== '') {
            if (!lock)
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
                                        param={'father'}
                                        fetch={getAddressBaseFather}
                                        title={'国家'}
                                        notice={notice}
                                        selected={country}
                                        setSelected={setCountry}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <CommonSelect
                                        param={country}
                                        fetch={getAddressBaseSon}
                                        active={provinceActive}
                                        title={'省'}
                                        notice={notice}
                                        selected={province}
                                        setSelected={setProvince}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <CommonSelect
                                        param={province}
                                        fetch={getAddressBaseSon}
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
                                        param={'father'}
                                        fetch={getTechnicalClassificationFather}
                                        title={'技术分类1级'}
                                        notice={notice}
                                        selected={classificationOne}
                                        setSelected={setClassificationOne}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <CommonSelect
                                        param={classificationOne}
                                        fetch={getTechnicalClassificationSon}
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
                                        param={'list'}
                                        fetch={getTechnicalAchievementsMaturityList}
                                        title={'成熟度'}
                                        notice={notice}
                                        selected={maturity}
                                        setSelected={setMaturity}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <CommonSelect
                                        param={'list'}
                                        fetch={getTechnicalAchievementsCooperationMethodList}
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
                        setLock={setLock}
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