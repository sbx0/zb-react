import React, {useState, useEffect} from 'react';

import {
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    ComposedChart,
    Line,
} from 'recharts';
import Skeleton from '@material-ui/lab/Skeleton';
import {fetchGet, fetchStatus, fetchStatusAlert} from "../../../../tools/Network";

export default function LineChart({notice, day, kind, group, referenceValue}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    function loadData() {
        let url = 'statistical/data/recent?day=' + day + '&kind=' + kind + '&group=' + group;
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                const data = json['objects']['data'];
                setData(data);
            } else {
                notice(fetchStatusAlert(status), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
    }

    useEffect(() => {
        loadData();
    }, [])

    useEffect(() => {
        setInterval(
            () => loadData(),
            1000 * 60 * 60,
        );
    }, [])

    return <>
        <div>
            {
                loading === true &&
                <Skeleton width="100%" height={285}/>
            }
            {
                loading === false &&
                <ResponsiveContainer width="100%" height={311}>
                    <ComposedChart
                        data={data}
                        margin={{
                            top: 5, right: 20, left: -15, bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis
                            hide
                            dataKey="date"
                        />
                        <YAxis
                            type={'number'}
                            unit={''}
                        />
                        {/*<ReferenceLine y={referenceValue} stroke="red" strokeDasharray="3 3"/>*/}
                        <Tooltip isAnimationActive={false}/>
                        <Line
                            type="monotone"
                            dataKey={kind}
                            name={kind}
                            stroke="#8884d8"
                            strokeWidth={2}
                            activeDot={{r: 2}}
                            isAnimationActive={false}
                            dot={false}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            }
        </div>
    </>;
}