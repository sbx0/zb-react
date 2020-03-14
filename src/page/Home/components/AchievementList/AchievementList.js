import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import "../../../../i18N"

import {fetchGet, fetchStatus, fetchStatusAlert} from '../../../../tools/Network';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import ShowCard from "../ShowCard/ShowCard";
import tools from "../../../../tools/Utils";
import Pagination from "@material-ui/lab/Pagination";

export default function AchievementList({loading, setLoading, notice}) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const [objects, setObjects] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [size, setSize] = useState(10);
    const [direction, setDirection] = useState('DESC');

    useEffect(() => {
        let url = 'technical/achievements/list?page=' + page +
            '&size=' + size +
            '&attribute=id' +
            '&direction=' + direction;
        setLoading(true);
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            setTotalPage(json['total_pages']);
            if (fetchStatus(status)) {
                setObjects(json.objects);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        }).finally(() => {
            setLoading(false);
        });
    }, [page]);

    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={1}
        >
            {loading ? (
                [0, 1, 2].map((one) => (
                    <Skeleton
                        key={one}
                        variant="rect"
                        width="100%"
                        height={70}
                    />
                ))
            ) : (
                objects.map((one) => (
                    <Grid item lg={4} md={6} sm={12} xs={12} key={one['id']}>
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
            <Grid item xs={12}>
                <Pagination
                    page={page}
                    onChange={(e, p) => {
                        setPage(p);
                    }}
                    count={totalPage}
                    showFirstButton
                    showLastButton
                />
            </Grid>
        </Grid>
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
