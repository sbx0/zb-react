import React, {useState, useEffect} from 'react';
import "../../i18N"
import {fetchStatus, fetchStatusAlert, getAddressBaseSonToFather} from "../../tools/Network";
import {useTranslation} from 'react-i18next';
import {Link as RouterLink} from "react-router-dom";
import {Link} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

export default function ShowAddress({id, notice, setLoading}) {
    const {t} = useTranslation();
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        if (id !== undefined) {
            getAddressBaseSonToFather({
                sonId: id
            }).then((json) => {
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
                            to={'/market/technical/achievements/addressId:' + one['id']}
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