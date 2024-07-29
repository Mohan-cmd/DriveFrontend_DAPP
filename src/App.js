import logo from './logo.svg';
import abi from './utils/Upload.json';
import {contractaddress} from './utils/Constants'
import './App.css';
import {useState,useEffect} from "react";
import FileUpload from './components/FileUpload';
import Display from './components/Display';
import Modal from './components/Modal';
const {ethers} =require("ethers");
function App() {
  const[account,setAccount] =useState("");
  const[contract,setContract] = useState(null);
  const[provider,setProvider] =useState(null);
  const[modalOpen,setModalOpen] =useState(false);
  const getUserAccount = async ()=>{
    try{
      
    if(window.ethereum){
      window.ethereum.on("chainChanged",()=>{
        window.location.reload();
      })
      window.ethereum.on('accountChanged',()=>{
        window.location.reload();
      })
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);
    const signer = await provider.getSigner();
    const user =  JSON.stringify(signer);
    const userAddress= await (JSON.parse(user)).address;
     console.log('signer is :'+userAddress);
    setAccount(userAddress);
    const contract = await new ethers.Contract(contractaddress,abi.abi,signer);
    setContract(contract)
    }
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
    {!modalOpen &&<button className="share" onClick={()=> setModalOpen(true)}>Share</button>}
    {modalOpen&&<Modal setModalOpen={setModalOpen} contract={contract} ></Modal>}
    <div>
    <div className="App">
    <h1 style={{color:'black'}}>Gdrive: 3.0</h1>

    {/* <div className='bg'></div>
    <div className='bg bg-2'></div>
    <div className='bg bg-3'></div> */}
    <p style={{color:'black'}}>
       Account : {account}
    </p>
    <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
    </div>
    <Display contract={contract} account={account} ></Display>
    </div>
    </>
  )
}

export default App;
