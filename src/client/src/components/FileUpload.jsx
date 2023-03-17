import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { useEffect } from 'react';

const FileUpload = ({onFileUpload}) => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const onChange = event =>{
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  }
  
  const onSubmit = async e =>{
    e.preventDefault();
    if(file === ''){
      alert("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append('file',file);
    try{
      const {data} = await axios({
        url:`${process.env.REACT_APP_BACKEND_SERVICE_URL}/upload`,
        method:'POST',
        data: formData,
        headers:{
          'Content-type':'multipart/form-data'
        }
      })
      onFileUpload(fileName,data);
      setFile('');
      setFileName('Choose File');
    }
    catch(err){
      console.log(err);
    }
  }
  
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="customFile" onChange={onChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
          <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
        </div>
        <input type="Submit" value="Upload" className="btn btn-primary btn-block mt-4"/>
      </form>
    </Fragment>
  )
}

export default FileUpload;