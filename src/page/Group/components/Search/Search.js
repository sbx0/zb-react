import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../../../i18N"

import {useHistory, useLocation} from "react-router-dom";

import {fetchStatus, fetchStatusAlert, getUserGroupList} from "../../../../tools/Network";

import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import {Card, CardHeader, CardContent} from "@material-ui/core";
import GroupList from "../List/List";

export default function GroupSearch({notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    const [name, setName] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(null);

    function searchKeyHandleChange(event) {
        setName(event.target.value);
    }

    function submit() {
        setSearchActive(!searchActive);
    }

    useEffect(() => {
        let isCancelled = false;
        getUserGroupList(
            name === '' ? {page: 1,} : {page: 1, name: name}
        ).then((json) => {
            if (!isCancelled) {
                const status = json['status'];
                if (fetchStatus(status)) {
                    const objects = json['objects'];
                    setGroups(objects);
                    setGroup(null);
                } else {
                    notice(t(fetchStatusAlert(status)), status);
                }
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
        return () => {
            isCancelled = true;
        };
    }, [searchActive]);


    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardHeader
                            subheader={t("搜索并创建或加入群组")}
                            title={t("搜索群组")}
                        />
                        <CardContent>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        label={t("群组名称")}
                                        value={name}
                                        onChange={searchKeyHandleChange}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider variant="fullWidth" className={classes.divider}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        onClick={submit}
                                    >
                                        {t("搜索群组")}
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardContent>
                            <GroupList
                                groups={groups}
                                setSearchActive={setSearchActive}
                                searchActive={searchActive}
                                notice={notice}
                                setLoading={setLoading}
                                from="search"
                                name={name}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    divider: {
        margin: '10px auto'
    }
}));