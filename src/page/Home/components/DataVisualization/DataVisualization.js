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

export default function DataVisualization({notice, day, kind, group, referenceValue}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let url = 'statistical/data/recent?day=' + day + '&kind=' + kind + '&group=' + group;
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                console.log(json["object"]);
                const data = json['objects']['data'];
                setData(data);
                setLoading(false);
            } else {
                notice(fetchStatusAlert(status), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
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
                            dataKey="date"
                        />
                        <YAxis
                            type={'number'}
                            unit={''}
                        />
                        <ReferenceLine y={referenceValue} stroke="red" strokeDasharray="3 3"/>
                        <Tooltip isAnimationActive={false}/>
                        <Line
                            type="monotone"
                            dataKey={kind}
                            name={kind}
                            stroke="#82ca9d"
                            strokeWidth={1}
                            isAnimationActive={false}
                            dot={false}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            }
        </div>
    </>;
}