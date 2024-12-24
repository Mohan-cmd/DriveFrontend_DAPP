
import { useState } from 'react';
import './FileUpload.css';
import axios from 'axios';
const FileUpload =({contract,account,provider})=>{
    const[files,setFiles] =useState([]);
    const[fileNames,setFileNames]= useState("No Image Selected");
    const handleSubmit = async(e)=>{
       e.preventDefault();
        try{
          if(files){
            console.log("account and con in FileUpload"+account+contract);
            console.log("FIles is : "+files)
            for(const file of files){
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
          // contract.methods.add(account,ImgHash.toString()).send({from:account});
          const folderName = document.querySelector('.folderInput').value;
          console.log('foldername is : '+folderName);
          await contract.methods.addFileToFolder(folderName,ImgHash).send({from:account});
          alert("Successfully Image Uploaded");
          setFileNames("No image Selected");
          setFiles([]);
        }
        }
        }catch(e){
          alert("Unable to Upload image to Pinata");
        }

    }
    const retrieveFile=(e)=>{
      // const dataFile = e.target.files[0];
      // console.log(dataFile);
      // const reader = new window.FileReader();
      // reader.readAsArrayBuffer(dataFile);
      // reader.onloadend=()=>{
      //   setFile(dataFile);
      //   e.preventDefault();
      // }
       const selectedFiles = Array.from(e.target.files);
       setFiles(selectedFiles);
       setFileNames(selectedFiles.map(file=>file.name).join(", "))
    } 
    return(
        <div className="top">
          <form className="form" onSubmit={handleSubmit}>
             <label htmlFor="file-upload" className="choose">
                Choose Files
             </label>
             <input disabled={!account} type="file" name='data' onChange={retrieveFile} id='file-upload' multiple></input>
             <input type='text' className='folderInput' placeholder=' Enter Folder Name'/>
             {/* <span className="textArea">Image:{fileName}</span> */}
             <button type="submit" className="upload" disabled={!files}>Upload Files</button>
             
          </form>
        </div>
    )
}

export default FileUpload;