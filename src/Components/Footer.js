import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import "../i18N"
import LanguageSelect from "./LanguageSelect";
import global from '../tools/Global';
import Link from "@material-ui/core/Link";
import {useHistory} from "react-router-dom";

export default function Footer() {
    const {t} = useTranslation();
    const classes = useStyles();
    let history = useHistory();

    return (
        <>
            <Box
                pt={2}
                onClick={() => {
                    history.push("/about");
                }}
            >
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    align="center"
                >
                    <Typography variant="caption" display="block">
                        <Typography variant="body1">
                            {t("智贝")}<br/>
                        </Typography>
                        <Typography variant="body2">
                            {t("线上技术对接与交流平台")}<br/>
                        </Typography>
                        <Link color="inherit" href="https://blog.sbx0.cn/">
                            sbx0.cn
                        </Link>{' '}
                        2019 - {new Date().getFullYear()}<br/><br/>
                        {t("版本")} {global.dev_version}<br/>
                        Power By React
                    </Typography>
                </Grid>
            </Box>
        </>
    );
}

const useStyles = makeStyles(() => ({}));