import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import {fetchStatus} from "../tools/Network";
import "../i18N/i18N"

export default function CommonSelect(
    {
        param,
        active,
        selected,
        setSelected,
        fetch,
        title,
        notice
    }
) {
    const {t} = useTranslation();
    const classes = useStyles();
    const [options, setOptions] = useState([]);

    const handleChange = event => {
        setSelected(event.target.value);
    };

    useEffect(() => {
        let isCancelled = false;
        if (param !== '') {
            fetch(param).then((json) => {
                if (!isCancelled) {
                    const status = json['status'];
                    if (fetchStatus(status)) {
                        setOptions(json["objects"]);
                    }
                }
            }).catch((error) => {
                notice(error.toString(), -1);
            });
        }
        return () => {
            isCancelled = true;
        };
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
                    <em>{t('请选择')}</em>
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
        width: '90%',
    },
}));