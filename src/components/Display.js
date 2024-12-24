import { useState } from "react";
import './Display.css';
import Accordian from "./Accordian";
const Display =({contract,account})=>{
    
      console.log("inside display account is "+account+" contract is : "+contract);
      const[activeIndex,setActiveIndex] = useState(null);
     const[data,setData] = useState(null)
     const[fullData,setFullData] = useState(null)
     const[isEmpty,setIsEmpty]=useState(false)
     const toggleAccordian =(index)=>{

        if(index===activeIndex){
            setActiveIndex(null);
        }else{
            setActiveIndex(index);
        }
       }
       const getdata = async () => {
        try {
          let dataArray;
          const target = await contract.options.address;
          console.log(target);
          const otherAddress = document.querySelector(".address2").value;
      
          console.log("other is : " + otherAddress);
          if (otherAddress) {
            console.log('inside other');
            dataArray = await contract.methods.getSharedFolders(otherAddress, account).call({ from: account });
            console.log('daa arr is :' + JSON.stringify(dataArray));
            
            const isEmptyy = Object.keys(dataArray).length === 0;
            setIsEmpty(isEmptyy);
            if (!isEmptyy) {  
                setData(dataArray);
            }
          } 
      
        } catch (error) {
          console.log("error is : " + error);
        }
      
    }

    const getFullData = async()=>{
        try {
            let dataArray;
            const target = await contract.options.address;
            console.log(target);
            const otherAddress = document.querySelector(".address2").value;
        
            console.log("other is : " + otherAddress);
            if (otherAddress) {
                dataArray = await contract.methods.display(otherAddress).call({ from: account });
                console.log('daa1 arr is :' + JSON.stringify(dataArray));
               
                const isEmptyy = Object.keys(dataArray).length === 0;
                setIsEmpty(isEmptyy);
                if (!isEmptyy) {  
                    setData(dataArray);
                }
            }
        
          } catch (error) {
            console.log("error is : " + error);
          }    
    }

     return(
        <div>
  {/* <div className="image-list">{data}</div> */}
  <input type="text" placeholder="Enter Address" className="address2" ></input>
  <button className="center button" onClick={getdata}>
    Get Shared Resources
  </button>
  <button className="center button" onClick={getFullData}>
    Full User Access
  </button>
  {!isEmpty && data &&
    <div style={{width:'90%' , margin:'0 auto'}}>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <div style={{ padding: '10px', backgroundColor: '#f7f7f7', cursor: 'pointer', fontWeight: 'bold',textAlign:'left' }}
            onClick={() => toggleAccordian(index)}>
            {item.folderName} {/* Render folder name */}
          </div>
          {activeIndex === index && (
            <div style={{ padding: '10px', backgroundColor: '#fff', borderTop: '1px solid #ccc' }}>
              {/* Render files as images */}
              <div style={{ display: 'flex' }}>
                {item.files?.map((fileHash, idx) => (
                  <a href={`https://gateway.pinata.cloud/ipfs/${fileHash}`} key={idx} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${fileHash}`}
                      alt={`File ${idx}`}
                      className="image-list"
                      style={{ width: '350px', height: '300px' }}
                      onError={(e) => e.target.src = 'https://www.logicnavigator.com/uploads/8/3/2/7/83271518/fileimage_13.png'}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  }
</div>

      
     )
}

export default Display;


// daa arr is :[{"0":"folder1","1":["QmdcJzfJNsRGNMD79xRHUgWAbFuHGZMt4Pn48ncQtvBsSQ","QmUopP9tsLvCaKknV7dPafLXAoQwgYdS262XKVgjJ8mePK"],"__length__":2,"folderName":"folder1","files":["QmdcJzfJNsRGNMD79xRHUgWAbFuHGZMt4Pn48ncQtvBsSQ","QmUopP9tsLvCaKknV7dPafLXAoQwgYdS262XKVgjJ8mePK"]}]
