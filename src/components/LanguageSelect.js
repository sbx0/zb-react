import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../i18N"

import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
            <Select value={language} onChange={handleChange}>
                <MenuItem value="zh-CN">简体中文</MenuItem>
                <MenuItem value="zh-TW">繁體中文</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="jp">日本語</MenuItem>
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