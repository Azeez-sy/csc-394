import React, { useCallback, useEffect, useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import "../styles/drag-drop-files.css"
import x from "./icons/x.png"
import document from "./icons/document.png"

const FileUploadZone = () => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])

  const handleDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, []);

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeRejected = name => {
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }

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
          <div className="dropzone-files">
            <h4>Files</h4>
            <div className='file-preview'>
              {files.map(file => (
                <li key={file.name} className="file-item">
                  <div className='file-content'>
                    <span className='document-icon-container'>
                      <img src={document} alt="📄" className='document-icon'/>
                    </span>
                    <span className='file-name'>{file.name}</span>
                  </div>
                  <button
                    type="button"
                    className='x-button'
                    onClick={() => removeFile(file.name)}>
                    <img src={x} alt="X" className='x-icon' />
                  </button>
                </li>
              ))}
            </div>
          </div>
      </section>
      )}
    </Dropzone>
  );
};

export default FileUploadZone;