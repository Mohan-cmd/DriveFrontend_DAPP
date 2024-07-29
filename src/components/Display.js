import { useState } from "react";
import './Display.css';

const Display =({contract,account})=>{

     const[data,setData] = useState("")
     
     const getdata = async ()=>{
        try{
        let dataArray;
        const otherAddress = document.querySelector(".address").value;
        console.log(otherAddress);
        if(otherAddress){
            dataArray = await contract.display(otherAddress);
            console.log(dataArray);
        } else{
            dataArray = await contract.display(account);
            console.log(dataArray);
        }
         const isEmpty = Object.keys(dataArray).length === 0;
        if(!isEmpty){
            const str = dataArray.toString();
            console.log(str);
            const str_array = str.split(",");
            const images = str_array.map((item,i)=>{
               
                return(
                    <a href={`https://gateway.pinata.cloud/ipfs/${item}`} key={i} target="_blank">
                        <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item}`} className="image-list" onError={(e)=>e.target.src='https://www.logicnavigator.com/uploads/8/3/2/7/83271518/fileimage_13.png'}></img>
                    </a>
                )
            })
            setData(images)
        }else{
            alert("No Image to Display")
        }

    }
    catch(error){
        console.log("error is : "+error)
    }
    }

     return(
        <div>
            <div className="image-list">{data}</div>
            <input type="text" placeholder="Enter Address" className="address" ></input>
            <button className="center button" onClick={getdata}>
              Get Data
            </button>
        </div>
     )
}

export default Display;