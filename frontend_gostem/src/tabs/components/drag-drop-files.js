import React, { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import "../styles/drag-drop-files.css"
import x from "./icons/x.png"
import document from "./icons/document.png"

const FileUploadZone = ({ onFileUpload, initialFiles = [] }) => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])

  // Initialize with initialFiles when component mounts or initialFiles changes
  useEffect(() => {
    if (initialFiles && initialFiles.length > 0) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  // Call parent callback whenever files change
  useEffect(() => {
    if (onFileUpload) {
      onFileUpload(files);
    }
  }, [files, onFileUpload]);

  // Only accept docx, jpeg, jpg, png, and pdf files
  const acceptedFileTypes = {
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png'],
    'application/pdf': ['.pdf']
  };

  const handleDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles]);
      alert("Some files were rejected. Only .docx, .jpeg, .jpg, .png, and .pdf files are allowed.");
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
    <Dropzone 
      onDrop={handleDrop}
      accept={acceptedFileTypes}
      maxSize={5242880} // 5MB file size limit
    >
      {({getRootProps, getInputProps}) => (
        <section className="dropzone-section">
        <div {...getRootProps()} className="dropzone-container">
          <input {...getInputProps()} />
          <p className="dropzone-text">
            Drag and drop your files here, or click to select files
          </p>
          <p className="dropzone-text-small">
            Accepted file types: .docx, .jpeg, .jpg, .png, .pdf (max 5MB)
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