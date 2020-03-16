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

export default function Footer() {
    const {t} = useTranslation();
    const classes = useStyles();

    return (
        <>
            <Box mb={2} mt={2}>
                <Divider variant="middle" className={classes.divider}/>
            </Box>
            <Box mb={2}>
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    align="center"
                >
                    <Typography variant="caption" display="block">
                        {t("智贝")}<br/>
                        {t("线上技术对接与交流平台")}<br/>
                        {global.dev_time} {t("版本")} {global.dev_version}<br/>
                        {t("您可以在")} <Link href={'https://github.com/sbx0/zb-react'}>Github</Link> {t("查看详细开发记录")}<br/>
                        Power By React<br/>
                        {'Copyright © '}
                        <Link color="inherit" href="https://blog.sbx0.cn/">
                            sbx0.cn
                        </Link>{' '}
                        {new Date().getFullYear()}
                    </Typography>
                </Grid>
            </Box>
        </>
    );
}

const useStyles = makeStyles(() => ({}));