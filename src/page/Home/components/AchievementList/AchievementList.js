import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import "../../../../i18N"

import {fetchGet, fetchStatus, fetchStatusAlert} from '../../../../tools/Network';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import ShowCard from "../ShowCard/ShowCard";
import tools from "../../../../tools/Utils";

export default function AchievementList({loading, setLoading, notice}) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const [objects, setObjects] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [size, setSize] = useState(10);
    const [direction, setDirection] = useState('DESC');

    useEffect(() => {
        let url = 'technical/achievements/list?page=' + (page + 1) +
            '&size=' + size +
            '&attribute=id' +
            '&direction=' + direction;
        let cache = JSON.parse(localStorage.getItem(url + tools.cacheTimeStamp(1)));
        if (cache != null && cache.length > 0) setObjects(cache);
        else {
            setLoading(true);
            fetchGet(
                url
            ).then((json) => {
                const status = json['status'];
                setTotalPage(json['totalPage']);
                if (fetchStatus(status)) {
                    setObjects(json.objects);
                    localStorage.setItem(url + tools.cacheTimeStamp(1), JSON.stringify(json.objects));
                } else {
                    notice(t(fetchStatusAlert(status)), status);
                }
                setLoading(false);
            }).catch((error) => {
                notice(error.toString(), -1);
                setLoading(false);
            });
        }
    }, [page, size, direction]);

    // function load() {
    //     setPage(page + 1);
    // }

    return (
        <>
            {loading ? (
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((one) => (
                    <Skeleton
                        key={one}
                        variant="rect"
                        width="100%"
                        height={70}
                    />
                ))
            ) : (
                objects.map((one) => (
                    <Grid item sm={6} xs={12} key={one['id']}>
                        <ShowCard
                            url={"/one/technical/achievements/" + one['id']}
                            title={one['name']}
                            time={one['postTime']}
                            desc={one['context']}
                            img={one['cover']}
                            price={one['price']}
                        />
                    </Grid>
                )))
            }
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '5px 8px',
        margin: '0px auto',
    },
    center: {
        margin: '5px auto',
    }
}));
