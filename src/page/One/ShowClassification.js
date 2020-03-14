import React, {useState, useEffect} from 'react';
import "../../i18N"
import {fetchGet, fetchStatus, fetchStatusAlert} from "../../tools/Network";
import {useTranslation} from 'react-i18next';
import {useHistory, useLocation} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {Divider, Link} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link as RouterLink} from 'react-router-dom';

export default function ShowClassification({id, notice, setLoading}) {
    const classes = useStyles();
    const {t} = useTranslation();
    let location = useLocation();
    let history = useHistory();
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        if (id !== undefined) {
            let url = 'technical/classification/sonToFather?sonId=' + id;
            fetchGet(
                url
            ).then((json) => {
                const status = json['status'];
                if (fetchStatus(status)) {
                    setObjects(json['objects'].reverse());
                } else {
                    notice(t(fetchStatusAlert(status)), status);
                }
            }).catch((error) => {
                notice(error.toString(), -1);
            }).finally(() => {

            })
        }
    }, [id]);

    return (
        <>
            <Breadcrumbs>
                {
                    objects.map((one, index, list) => (
                        <Link
                            component={RouterLink}
                            to={'/market/technical/achievements/classificationId:' + one['id']}
                            key={one['id']}
                            color={(index + 1) < list.length ? 'inherit' : 'textPrimary'}
                        >
                            {one['name']}
                        </Link>
                    ))
                }
            </Breadcrumbs>
        </>
    );
}

const useStyles = makeStyles(theme => ({}));