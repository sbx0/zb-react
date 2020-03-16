import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {useTranslation} from "react-i18next";
import {fetchStatus, fetchStatusAlert, getUrlUploadFile} from "../tools/Network";

export default function CommonUpload({notice, setFileUrl}) {
    const {t} = useTranslation();

    const onDrop = useCallback(acceptedFiles => {
        let isCancelled = false;
        let formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        getUrlUploadFile(formData).then((json) => {
            if (!isCancelled) {
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
            }
        }).catch((error) => {
            notice(error.toString(), -1);
        });
        return () => {
            isCancelled = true;
        }
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

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