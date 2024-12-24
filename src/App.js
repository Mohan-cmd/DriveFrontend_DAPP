import logo from './logo.svg';
import abi from './utils/Upload.json';
import {contractaddress} from './utils/Constants'
import './App.css';
import {useState,useEffect} from "react";
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';
import Web3 from 'web3';
import ViewFiles from './components/ViewFiles';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAppContext } from './AppContext';

const {ethers} =require("ethers");
function App() {
  // const[account,setAccount] =useState("");
  // const[contract,setContract] = useState(null);
  const[provider,setProvider] =useState(null);
  const[modalOpen,setModalOpen] =useState(false);
  const[modalFolder,setModalFolder] =useState("");
  const { account, setAccount, contract, setContract } = useAppContext();
  const getUserAccount = async ()=>{
    try{
    //   if(typeof window.ethereum !=='undefined'){
    //     const web3 = new Web3(window.ethereum);
    //  }
    // if(window.ethereum){
    //   window.ethereum.on("chainChanged",()=>{
    //     window.location.reload();
    //   })
    //   window.ethereum.on('accountChanged',()=>{
    //     window.location.reload();
    //   })
    // const provider = new ethers.BrowserProvider(window.ethereum);
    // setProvider(provider);
    // const signer = await provider.getSigner();
    // const user =  JSON.stringify(signer);
    // const userAddress= await (JSON.parse(user)).address;
    const handleAccountChange= (accounts)=>{
      if(accounts.length>0){
       const userAddress = accounts[0];
    console.log('signer is :'+userAddress);
    window.location.reload();
      }
   }
    const web3 = new Web3(window.ethereum);
    window.ethereum.on('accountsChanged',handleAccountChange)
    await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];
     console.log('signer is :'+userAddress);
    setAccount(userAddress);
   
     
   
     
    // const contract = await new web3.eth.Contract(contractaddress,abi.abi,signer);
    console.log('ABI is : '+abi.abi);
    console.log('contract address is '+contractaddress);
    const contract = await new web3.eth.Contract(abi.abi,contractaddress);
    // console.log('contract address is : '+JSON.stringify(contract));
    setContract(contract)
    // }
  }
  catch(error){
    console.log('error occured in App comp: '+error);
  }
  } 

  useEffect( ()=>{
     getUserAccount();

  },[])

  return(
    <>
    <div style={{display:"flex",flexDirection:"column"}}>
      <div >
      <div >
      {!modalOpen &&<button className="share" onClick={()=> setModalOpen(true)}>Share Full Access</button>}
      </div>
      <div>
      {!modalOpen &&
          
          <Link to="/viewFiles" className="share" > View Files
          {/* <button className="share" onClick={()=> setModalOpen(true)}>View Files</button> */}
          </Link>
      }
      </div>
      <div>{!modalOpen &&<Link to="/" className="share" >Home</Link>}
      </div>
      </div>
    {modalOpen&&<Modal setModalOpen={setModalOpen} contract={contract} account={account} modalFolder={modalFolder}></Modal>}
    <div>
    
    <div className="App">
    <h1 style={{color:'black'}}>Drive: 3.0</h1>

    {/* <div className='bg'></div>
    <div className='bg bg-2'></div>
    <div className='bg bg-3'></div> */}
    
    <p style={{color:'black'}}>
       Account : {account}
    </p>
    
    
    <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
    <Display contract={contract} account={account} ></Display>
    </div>
    </div>
    </div>
    <Outlet />
    </>
  )
}

export default App;
