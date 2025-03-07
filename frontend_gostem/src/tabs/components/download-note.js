import React from 'react';
    
    const DownloadButton = ({ filePath, filename }) => {
      const handleDownload = () => {
        fetch(`/api/download/${filePath}`, { // Adjust the URL as needed
          method: 'GET',
          responseType: 'blob',
        })
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
      };
    
      return (
        <button onClick={handleDownload}>Download {filename}</button>
      );
    };
    
    export default DownloadButton;
