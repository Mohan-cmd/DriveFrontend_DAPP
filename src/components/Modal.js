
import "./Modal.css";
import { useEffect } from "react";
const Modal = ({setModalOpen,contract})=>{
    const sharing= async()=>{
        try{
        const address= document.querySelector(".address").value;
        console.log(address)
        await contract.allow(address);
        setModalOpen(false);
        }catch(error){
            console.log(`error occured while sharing: ${error}`)
        }
    }
    const accessList = async ()=>{
        const addressList = await contract.shareAccess();
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
             <div className="body">
             <input type="text" className="address" placeholder="Enter Address"></input>
             </div>
             <form id="myForm">
                <select id="selectNumber">
                    <option className="address">People with Access</option>
                </select>
             </form>
             <div className="footer">
                 <button onClick={()=>{setModalOpen(false)}} id="cancelBtn">Cancel</button>
                 <button onClick={()=>sharing()}>Share</button>
             </div>
         </div>

         </div>
        </>
    )
}

export default Modal;