import React, {useState, useEffect} from 'react';

import {
    Bar,
    Tooltip,
    ResponsiveContainer,
    ComposedChart,
    XAxis, YAxis,
    LabelList
} from 'recharts';
import Skeleton from '@material-ui/lab/Skeleton';
import {fetchGet, fetchStatus, fetchStatusAlert} from "../../../../tools/Network";
import Typography from "@material-ui/core/Typography";
import global from "../../../../tools/Global";
import LanguageSelect from "../../../../Components/LanguageSelect";

export default function PieChart({notice, day, kind, group, referenceValue}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let url = 'statistical/user/client';
        fetchGet(
            url
        ).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                const data = json['objects']['data'];
                setData(data);
                setLoading(false);
            } else {
                notice(fetchStatusAlert(status), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
    }, []);

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
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <XAxis
                            dataKey="name"
                        />
                        <YAxis
                            type={'number'}
                            unit={''}
                        />
                        {/*<ReferenceLine y={referenceValue} stroke="red" strokeDasharray="3 3"/>*/}
                        <Tooltip isAnimationActive={false}/>
                        <Bar dataKey="value" barSize={20} fill="#8884d8"/>
                    </ComposedChart>
                </ResponsiveContainer>
            }
        </div>
    </>;
}