import React from 'react'
import { useLocation } from 'react-router-dom';
// import { useAppContext } from './AppContext';
import { useAppContext } from '../AppContext';
import { useEffect,useState } from 'react';
import Accordian from './Accordian';


const accordionItems = [
  { title: 'Accordion 1', content: 'Content for Accordion 1' },
  { title: 'Accordion 2', content: 'Content for Accordion 2' },
  { title: 'Accordion 3', content: 'Content for Accordion 3' },
];
const ViewFiles =() => {
  const[items,setItems]=useState(null);
    const location = useLocation();
    // const {account,contract} = location.state||{};
    const { account, contract } = useAppContext();
    const getFilesData= async()=>{
      
      if(account&&contract){
        console.log("called getFiles")
       const data= await contract.methods.getAllFolders(account).call({from:account})
       console.log("viewFiles data is :"+JSON.stringify(data))
       setItems(data)
      }
    }
    useEffect(()=>{
      if(account&&contract){
      getFilesData()}
    },[account,contract])
  return (
    <div>
      <Accordian items={items}>

      </Accordian>
    </div>
  )
}

export default ViewFiles;
