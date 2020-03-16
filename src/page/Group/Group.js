import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import "../../i18N"
import {fetchStatus, fetchStatusAlert, getUserGroupMy} from "../../tools/Network";
import Grid from "@material-ui/core/Grid";
import {Card, CardHeader, CardContent} from "@material-ui/core";
import GroupList from "./components/List/List";

export default function Group({notice, setLoading}) {
    const {t} = useTranslation();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        let isCancelled = false;
        getUserGroupMy().then((json) => {
            if (!isCancelled) {
                const status = json['status'];
                if (fetchStatus(status)) {
                    const objects = json['objects'];
                    setGroups(objects);
                } else {
                    notice(t(fetchStatusAlert(status)), status);
                }
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
        return () => {
            isCancelled = true;
        }
    }, []);

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardHeader
                            subheader={t("创建或加入的群组")}
                            title={t("我的群组")}
                        />
                        <CardContent>
                            <GroupList
                                notice={notice}
                                setLoading={setLoading}
                                groups={groups}
                                from="index"
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}