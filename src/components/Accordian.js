import { useState } from "react";
import Modal from "./Modal";
import { useAppContext } from "../AppContext";
const Accordian =({items})=>{

   const[activeIndex,setActiveIndex] = useState(null);
   const[shareAFolder,setShareAFolder] = useState('');
   const[modalOpen,setModalOpen]= useState(false);
   const{account,contract} = useAppContext();
   const toggleAccordian =(index)=>{

    if(index===activeIndex){
        setActiveIndex(null);
    }else{
        setActiveIndex(index);
    }
   }
   const shareFolder=(e)=>{
    e.preventDefault();
    setModalOpen(true);
    setShareAFolder(e.target.value);
    console.log(e.target.value)
    console.log("modal data from share Access is :"+modalOpen+e.target.value)
    
   }
   console.log("Rendering Accordian, modalOpen:", modalOpen);
   

    return(
        <div>
        {!modalOpen&&<div style={{width:'90%',margin:'0 auto'}}>
            {items&& items.map((item,index)=>(
                    <div key={index} style={{marginBottom:'10px',border:'1px solid #ccc',borderRadius:'3px'}}>
                         <div style={{padding:'10px',backgroundColor:'#f7f7f7',cursor:'pointer',fontWeight:'bold'}}
                         onClick={()=>toggleAccordian(index)}>
                         {item.folderName} 
                          <button style={{float:'right',color:'white',backgroundColor:'#f44336',border:'1px solid black',padding:'3px',borderRadius:'3px'}} onClick={(e)=>shareFolder(e)} value={item.folderName}>Share</button>
                         </div>
                         {activeIndex===index &&(
                            <div style={{padding:'10px',backgroundColor:'#fff',borderTop:'1px solid #ccc'}}>
                            {/* {item.files} */}
                            <div style={{display:'flex'}}>
                            {item.files?.map((ite,index)=>(
                                <a href={`https://gateway.pinata.cloud/ipfs/${ite}`} key={index} target="_blank">
                                  <img key={index} src={`https://gateway.pinata.cloud/ipfs/${ite}`} className="image-list" style={{width:'350px',height:'300px'}} onError={(e)=>e.target.src='https://www.logicnavigator.com/uploads/8/3/2/7/83271518/fileimage_13.png'}></img>
                                 </a>
                            ))}
                            </div>
                            </div>
                         )

                         }
                    </div>
                ))
            }
        </div>}
        {modalOpen&&<Modal setModalOpen={setModalOpen} contract={contract} account={account} modalFolder={shareAFolder}></Modal>}
        </div>
    )
}

export default Accordian;


