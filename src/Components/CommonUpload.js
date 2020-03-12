import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {useTranslation} from "react-i18next";
import {fetchStatus, fetchStatusAlert, fetchUpload} from "../tools/Network";

export default function CommonUpload({notice, setFileUrl}) {
    const {t} = useTranslation();

    const onDrop = useCallback(acceptedFiles => {
        let formData = new FormData()
        formData.append('file', acceptedFiles[0]);
        fetchUpload('file/upload/submit', formData).then((json) => {
            const status = json['status'];
            if (fetchStatus(status) || status === 3) {
                const name = json['name'];
                const type = json['type'];
                const user = "user" + json['user'];
                const filePath = localStorage.getItem("server_config") + "upload/" + user + "/" + type + "/" + name;
                setFileUrl(filePath);
            } else {
                notice(t(fetchStatusAlert(status)), status);
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>{t("松开鼠标即可上传")}</p> :
                        <p>{t("将文件拖到这里或点击此处")}</p>
                }
            </div>
        </>
    )
}