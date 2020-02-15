import React from 'react';
import {useDropzone} from 'react-dropzone';
import MyAvatarEditor from "../AvatarEditor/AvatarEditor";

export default function UploadAvatar(props) {
    const {acceptedFiles, rejectedFiles, getRootProps, getInputProps} = useDropzone({
        accept: 'image/jpeg, image/png, image/ico'
    });

    const acceptedFilesItems = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const rejectedFilesItems = rejectedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Only *.jpeg and *.png and *.ico images will be accepted)</em>
            </div>
            <aside>
                <h4>Accepted files</h4>
                <ul>
                    {acceptedFilesItems}
                </ul>
                <h4>Rejected files</h4>
                <ul>
                    {rejectedFilesItems}
                </ul>
            </aside>
            <MyAvatarEditor/>
        </section>
    );
}