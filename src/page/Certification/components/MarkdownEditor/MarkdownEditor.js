import React, {useState, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import "../../../../i18N"

import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor({value, setValue}) {
    const {t, i18n} = useTranslation();
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = useState("write");

    function changeTab() {
        if (selectedTab == "write") {
            setSelectedTab("preview");
        } else {
            setSelectedTab("write")
        }
    }

    return (
        <ReactMde
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={changeTab}
            generateMarkdownPreview={(markdown) =>
                Promise.resolve(<ReactMarkdown source={markdown}/>)
            }
        />
    );
}

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));