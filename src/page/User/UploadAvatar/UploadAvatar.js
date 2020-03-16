import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import MyAvatarEditor from "../AvatarEditor/AvatarEditor";
import {useTranslation} from "react-i18next";
import {fetchStatus, fetchStatusAlert, getUrlUploadFile} from "../../../tools/Network";

export default function UploadAvatar({notice, changeActive, active}) {
    const {t} = useTranslation();
    const [isUpload, setIsUpload] = useState(false);
    const [file, setFile] = useState("/avatar.ico");

    const onDrop = useCallback(acceptedFiles => {
        let isCancelled = false;
        let formData = new FormData()
        formData.append('file', acceptedFiles[0]);
        getUrlUploadFile(formData).then((json) => {
            if (!isCancelled) {
                const status = json['status'];
                if (fetchStatus(status) || status === 3) {
                    const name = json['name'];
                    const type = json['type'];
                    const user = "user" + json['user'];
                    const filePath = localStorage.getItem("server_config") + "upload/" + user + "/" + type + "/" + name;
                    setFile(filePath);
                    setIsUpload(true);
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
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <>
            {
                isUpload ?
                    <MyAvatarEditor file={file} notice={notice} active={active} changeActive={changeActive}/>
                    :
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                                <p>{t("松开鼠标即可上传")}</p> :
                                <p>{t("将文件拖到这里或点击此处")}</p>
                        }
                    </div>
            }
        </>
    )
}