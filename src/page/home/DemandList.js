import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import i18N from '../../i18N/i18N_zh_CN';
import tools from '../../tools/Utils';
import {fetchGet} from '../../tools/Network';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import DemandOne from "./DemandOne";

DemandList.propTypes = {
    setMsg: PropTypes.func,
    setLoading: PropTypes.func,
};

export default function DemandList({loading,setLoading, setMsg}) {
    const classes = useStyles();
    const [demands, setDemands] = useState([]);
    const [page, setPage] = useState(i18N.common.fetch.page);
    const [totalPage, setTotalPage] = useState(i18N.common.fetch.page);
    const [size, setSize] = useState(i18N.common.fetch.size);
    const [direction, setDirection] = useState(i18N.common.fetch.direction);

    useEffect(() => {
        setLoading(true);
        fetchGet(
            '/demand/normal/list?page=' + (page + 1) +
            '&size=' + size +
            '&attribute=time' +
            '&direction=' + direction
        ).then((json) => {
            const status = json['status'];
            setTotalPage(json['totalPage']);
            if (tools.statusToBool(status)) {
                setDemands(json.objects);
                setMsg("加载成功");
            } else {
                setMsg(tools.statusToAlert(status));
            }
            setLoading(false);
        });
    }, [page, size, direction, setLoading, setMsg]);

    // function load() {
    //     setPage(page + 1);
    // }

    return (
        <div className={classes.center}>
            <Grid container spacing={3}>
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
                    demands.map((one) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={one.id}>
                            <DemandOne demand={one}/>
                        </Grid>
                    )))
                }
            </Grid>
        </div>
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
