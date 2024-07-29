
import { useState } from 'react';
import './FileUpload.css';
import axios from 'axios';
const FileUpload =({contract,account,provider})=>{
    const[file,setFile] =useState(null);
    const[fileName,setFileName]= useState("No Image Selected");
    const handleSubmit = async(e)=>{
       e.preventDefault();
        try{
          if(File){
          const formData = new FormData();
          formData.append("file",file);

          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data:formData,
            headers:{
              'pinata_api_key': '2ca86bc90e1b48158bcb',
              'pinata_secret_api_key': '7e7cd459dab0c302b6c3382a8320ea92a8df9c3dffeeba7e8f1c243f724b5ffa',
              "Content-Type": "multipart/form-data",
              

            },
          })  
          console.log('resFile is :'+resFile);
          console.log(JSON.stringify(resFile));
          const ImgHash= resFile.data.IpfsHash ;
          
          //const signer = contract.connect(provider.getSigner());
          console.log('account is : '+account+'ImgHash is :'+ImgHash);
          // console.log()
           contract.add(account,ImgHash.toString());
          alert("Successfully Image Uploaded");
          setFileName("No image Selected");
          setFile(null);
        }
        }catch(e){
          alert("Unable to Upload image to Pinata");
        }

    }
    const retrieveFile=(e)=>{
      const dataFile = e.target.files[0];
      console.log(dataFile);
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(dataFile);
      reader.onloadend=()=>{
        setFile(dataFile);
        e.preventDefault();
      }

    } 
    return(
        <div className="top">
          <form className="form" onSubmit={handleSubmit}>
             <label htmlFor="file-upload" className="choose">
                Choose Image
             </label>
             <input disabled={!account} type="file" name='data' onChange={retrieveFile} id='file-upload'></input>
             <span className="textArea">Image:{fileName}</span>
             <button type="submit" className="upload" disabled={!file}>Upload File</button>
          </form>
        </div>
    )
}

export default FileUpload;