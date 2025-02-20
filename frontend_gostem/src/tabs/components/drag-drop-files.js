import React from 'react';
import Dropzone from 'react-dropzone';
import "../styles/drag-drop-files.css"

const FileUploadZone = () => {
  const handleDrop = acceptedFiles => {
    console.log(acceptedFiles);
  };

  return (
    <Dropzone onDrop={handleDrop}>
      {({getRootProps, getInputProps}) => (
        <section className="dropzone-section">
        <div {...getRootProps()} className="dropzone-container">
          <input {...getInputProps()} />
          <p className="dropzone-text">
            Drag and drop your files here, or click to select files
          </p>
        </div>
      </section>
      )}
    </Dropzone>
  );
};

export default FileUploadZone;