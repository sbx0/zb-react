import React, {useEffect, useRef} from 'react'
import AvatarEditor from 'react-avatar-editor'
import {Slider, InputNumber, Button} from "antd";
import {getUrlUploadFile} from "@/pages/user/PostForm/service";
import {cs} from "@/services/status";

export default function MyAvatarEditor({file, setFile, setUpload, name}) {
  const [scale, setScale] = React.useState(1.0);
  const setEditorRef = useRef();

  useEffect(() => {
    console.log(file);
  }, [file]);

  function upload() {
    if (setEditorRef.current) {
      // const canvas = setEditorRef.current.getImage();
      const canvas = setEditorRef.current.getImageScaledToCanvas();
      canvas.toBlob(function (blob) {
        let formData = new FormData();
        formData.append('file', blob, name);
        getUrlUploadFile(formData).then((json) => {
          const status = json['status'];
          if (cs(status) || status === 3) {
            const name = json['name'];
            const type = json['type'];
            const user = "user" + json['user'];
            const filePath = localStorage.getItem("server_config") + "/upload/" + user + "/" + type + "/" + name;
            setFile(filePath);
            setUpload(true);
          } else {
          }
        }).catch((error) => {
        });
      })
    }
  }

  return (
    <>
      <AvatarEditor
        ref={setEditorRef}
        image={file}
        width={532}
        height={320}
        border={50}
        scale={scale}
        crossOrigin={'anonymous'}
        onLoadSuccess={(imgInfo) => {
          console.log(imgInfo)
        }}
      />
      <Slider value={typeof scale === 'number' ? scale : 0} onChange={(value) => setScale(value)} min={1} max={2}
              step={0.00001}/>
      <Button
        onClick={() => upload()}
      >
        确认上传
      </Button>
    </>
  )
}
