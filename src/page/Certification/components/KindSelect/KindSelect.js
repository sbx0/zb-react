import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../../../i18N"

import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import {fetchStatus, getUserCertificationType} from "../../../../tools/Network";

export default function KindSelect({kind, setKind, notice}) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const [kinds, setKinds] = useState([
        {value: 0, name: "个人"}
    ]);

    const handleChange = event => {
        setKind(event.target.value);
    };

    useEffect(() => {
        let isCancelled = false;
        getUserCertificationType().then((json) => {
            if (!isCancelled) {
                const status = json['status'];
                if (fetchStatus(status)) {
                    setKinds(json["objects"]);
                }
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="kind">{t("认证类别")}</InputLabel>
            <Select
                value={kind}
                onChange={handleChange}
                inputProps={{
                    name: 'kind',
                    id: 'kind',
                }}
                fullWidth
            >
                {
                    kinds.map((one) => (
                        <MenuItem key={one.value} value={one.value}>{t(one.name)}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
}

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));