import React from 'react';
    
    const DownloadButton = ({ filePath, filename, attachment }) => {
      
      const handleDownload = (filename) => {
        console.log("File name: "+filename);
        fetch(`http://localhost:8000/media/note_attachments/${filename}`, {
            method: 'GET',
            responseType: 'blob',
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
      };
    
      return (
        <a
          onClick={(event) => {
            event.preventDefault(); // Prevent default link navigation
            handleDownload(attachment.file.split('/').pop());
          }}
          href={attachment.file}
          target="_blank"
          rel="noopener noreferrer"
          className="file-name"
          download
        >
          {attachment.file.split('/').pop()}
        </a>
      );
    };
    
    export default DownloadButton;
