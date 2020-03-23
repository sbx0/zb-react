import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import MyAvatarEditor from "../AvatarEditor";
import {cs} from "@/services/status";
import {getUrlUploadFile} from "@/pages/user/PostForm/service";

export default function UploadAvatar({file, setFile, setUpload}) {
  const [isUpload, setIsUpload] = useState(false);
  const [name, setName] = useState(file);


  const onDrop = useCallback(acceptedFiles => {
    let isCancelled = false;
    let formData = new FormData()
    formData.append('file', acceptedFiles[0]);
    getUrlUploadFile(formData).then((json) => {
      if (!isCancelled) {
        const status = json['status'];
        if (cs(status) || status === 3) {
          const name = json['name'];
          const type = json['type'];
          const user = "user" + json['user'];
          const filePath = localStorage.getItem("server_config") + "/upload/" + user + "/" + type + "/" + name;
          setFile(filePath);
          setName(name);
          setIsUpload(true);
        } else {
        }
      }
    }).catch((error) => {
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
          <MyAvatarEditor file={file} setFile={setFile} setUpload={setUpload} name={name}/>
          :
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>松开鼠标即可上传</p> :
                <p>将文件拖到这里或点击此处</p>
            }
          </div>
      }
    </>
  )
}
