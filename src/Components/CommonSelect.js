import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../i18N/i18N"

import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import {fetchGet, fetchPost, fetchStatus, fetchStatusAlert} from "../tools/Network";

export default function CommonSelect(
    {
        active,
        selected,
        setSelected,
        url,
        title,
        notice
    }
) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const [options, setOptions] = useState([
        {value: 0, name: "加载中"}
    ]);

    const handleChange = event => {
        setSelected(event.target.value);
    };

    useEffect(() => {
        fetchGet(url).then((json) => {
            const status = json['status'];
            if (fetchStatus(status)) {
                setOptions(json["objects"]);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
    }, [active]);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="option">{t(title)}</InputLabel>
            <Select
                value={selected}
                onChange={handleChange}
                inputProps={{
                    name: 'option',
                    id: 'option',
                }}
                fullWidth
            >
                {
                    options.map((one) => (
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