import React, {useEffect, useRef} from 'react'
import AvatarEditor from 'react-avatar-editor'
import Slider from "@material-ui/core/Slider";
import {Button} from "@material-ui/core";
import {useTranslation} from 'react-i18next';
import "../../../i18N"
import {fetchStatusAlert, postFileUploadAvatar} from "../../../tools/Network";

export default function MyAvatarEditor({file, notice, active, changeActive}) {
    const [scale, setScale] = React.useState(1.0);
    const setEditorRef = useRef();
    const {t} = useTranslation();

    useEffect(() => {
        console.log(file);
    }, [file]);

    function upload() {
        if (setEditorRef.current) {
            // const canvas = setEditorRef.current.getImage();
            const canvas = setEditorRef.current.getImageScaledToCanvas();
            canvas.toBlob(function (blob) {
                let formData = new FormData();
                formData.append('file', blob, 'avatar.ico');
                postFileUploadAvatar(formData).then((json) => {
                    const status = json['status'];
                    notice(t(fetchStatusAlert(status)), status);
                    changeActive();
                }).catch((error) => {
                    notice(error.toString(), -1);
                });
            })
        }
    }

    const handleChange = (event, newValue) => {
        setScale(newValue);
    };

    return (
        <>
            <AvatarEditor
                ref={setEditorRef}
                image={file}
                width={250}
                height={250}
                border={50}
                scale={scale}
                crossOrigin={'anonymous'}
                onLoadSuccess={(imgInfo) => {
                    console.log(imgInfo)
                }}
            />
            <Slider value={scale} onChange={handleChange} min={1} max={2} step={0.00001}/>
            <Button
                color="primary"
                variant="text"
                onClick={() => upload()}
            >
                {t("确认上传")}
            </Button>
        </>
    )
}