import React, {useEffect, useRef} from 'react'
import AvatarEditor from 'react-avatar-editor'
import Slider from "@material-ui/core/Slider";
import {Button} from "@material-ui/core";
import {useTranslation} from 'react-i18next';
import "../../../i18N"

export default function MyAvatarEditor() {
    const [scale, setScale] = React.useState(1.2);
    const setEditorRef = useRef();
    const {t} = useTranslation();

    function upload() {
        if (setEditorRef.current) {
            const canvas = setEditorRef.current.getImage()
            console.log(canvas)
        }
    }

    const handleChange = (event, newValue) => {
        setScale(newValue);
    };

    return (
        <>
            <AvatarEditor
                ref={setEditorRef}
                image="/avatar.jpg"
                width={250}
                height={250}
                border={50}
                scale={scale}
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