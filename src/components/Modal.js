
import "./Modal.css";
import { useEffect, useState } from "react";
const Modal = ({setModalOpen,contract,account,modalFolder})=>{
    
    const[folders,setFolders] = useState([]);
    const[selectedFolder, setSelectedFolder] = useState("");
    // const[fullAccess,setFullAccess] = useState(true);
    const sharing= async()=>{
        if(modalFolder.length<=0){
            try{
            const address= document.querySelector(".address").value;
            console.log("to access address : "+address)
            await contract.methods.allow(address).send({from: account});
            
            setModalOpen(false);
            }catch(error){
                console.log(`error occured while sharing: ${error}`)
            }
        }else{
            try{
                const address= document.querySelector(".address1").value;
                console.log("to access address : "+address)
                console.log("sharing folder data is : "+modalFolder+"account is : "+address)
                await contract.methods.allowFolderAccess(address,modalFolder).send({from: account});
                setModalOpen(false);
            }catch(error){
                console.log(`error occured while sharing: ${error}`)
            }
        }
    }

    const sharingFolder = async()=>{
        try{
          
        }catch(error){
            console.log(`error occured while sharing: ${error}`)
        }
    }

    const accessList = async ()=>{
        const addressList = await contract.methods.shareAccess().call();
        let select = document.querySelector("#selectNumber");
        const options = await addressList;
        for(let i=0;i<options.length;i++){
            let opt = options[i];
            let e1 = document.createElement("option");
            e1.textContent =opt;
            e1.value = opt;
            select.appendChild(e1);
        }
    }
    useEffect(()=>{
        contract && accessList();
    },[]);
    return(
        <>
         <div className="modalBackground">
         <div className="modalContainer">
            <div className="title">Share with</div>
             {modalFolder.length<=0&&<div className="body">
             <input type="text" className="address" placeholder="Enter Address"></input>
             </div>}
             {/* <form id="myForm">
                <select id="selectNumber">
                    <option className="address">People with Access</option>
                </select>
             </form> */}
             {modalFolder.length>0&&<div className="body">
             <input type="text" className="address1" placeholder="Enter Address"></input>
             </div>}
             {modalFolder.length>0&&<input type="text" className="folder" placeholder="Enter Folder Name" value={modalFolder} disabled/>}
             <div className="footer">
                 <button onClick={()=>{setModalOpen(false)}} id="cancelBtn">Cancel</button>
                 <button onClick={()=>sharing(true)}>Share</button>
             </div>
             

         </div>

         </div>
        </>
    )
}

export default Modal;