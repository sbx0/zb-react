import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../i18N/i18N"

import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import {fetchGet, fetchPost, fetchStatus, fetchStatusAlert} from "../tools/Network";
import tools from "../tools/Utils";

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
        let cache = JSON.parse(localStorage.getItem(url));
        if (cache != null && cache.length > 0) {
            setOptions(cache);
            let colck = setInterval(() => {
            }, 100);
            clearInterval(colck);
        } else {
            fetchGet(url).then((json) => {
                const status = json['status'];
                if (fetchStatus(status)) {
                    setOptions(json["objects"]);
                    localStorage.setItem(url, JSON.stringify(json["objects"]));
                }
            }).catch((error) => {
                notice(error.toString(), -1);
            });
        }
    }, [active]);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel shrink>{t(title)}</InputLabel>
            <Select
                value={selected}
                onChange={handleChange}
                inputProps={{
                    name: 'option',
                    id: 'option',
                }}
                displayEmpty
            >
                <MenuItem value="">
                    <em>请选择</em>
                </MenuItem>
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