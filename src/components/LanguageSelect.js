import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import "../i18N/i18N"

import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function LanguageSelect() {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const [language, setLanguage] = useState(i18n.language);

    useEffect(() => {
        i18n.changeLanguage(language).then();
    }, [language]);

    const handleChange = event => {
        setLanguage(event.target.value);
    };

    return (
        <FormControl className={classes.formControl}>
            <Select value={language} onChange={handleChange} className={classes.selectEmpty}>
                <MenuItem value="zh-CN">简体中文</MenuItem>
                <MenuItem value="zh-TW">繁体中文</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="jp">日语</MenuItem>
            </Select>
        </FormControl>
    );
}