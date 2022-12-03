import './App.css';
import { useEffect,useState } from 'react';
import { ethers } from 'ethers';
import { parseEther, formatEther } from '@ethersproject/units';
import AddItem from './components/AddItem';
import Home from './components/Home';
import Navbar from './components/Navbar';
import contract from './contracts/Ecommerce.json'

const contractAddress="0xE0887f8C7e598188aa6394D12D487821C39bd72f"; 
const abi=contract.abi;
const url = "http://localhost:7545"

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);


  // Sets up a new Ethereum provider and returns an interface for interacting with the smart contract
 async function initializeProvider() {
  const {ethereum} =window;
  if(ethereum){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress,abi, signer);
  }
}


  const checkWalletIsConnected = async () => { 
    const {ethereum} =window;
    if (!ethereum){
      console.log("Install metamask");
    }
    else{
      console.log("we are good to go");
    }
    const accounts=await ethereum.request({method:'eth_requestAccounts'});
    if (accounts.length!==0){
      const account=accounts[0];
      console.log("found authorized account");
      setCurrentAccount(account);
    }
    else{
      console.log("no aouthorized account found")
    }
  }

const connectWalletHandler = async () => {
  const {ethereum} =window;
  if (!ethereum){
    alert("Please Install metamask");
  }
  try{
    const accounts=await ethereum.request({method:'eth_requestAccounts'});
    console.log("found account!",accounts[0]);
    setCurrentAccount(accounts[0]);

  }
  catch(err){
    console.log(err);
  }
 }

// const connectWalletButton = () => {
//   return (
//     <button style={{ marginLeft:10}} onClick={connectWalletHandler}>
//       Connect Wallet
//     </button>
//   )
// }
useEffect(() => {
  checkWalletIsConnected();
}, [])

async function onAddItem(item) {
  console.log(item);
   if (typeof window.ethereum !== 'undefined') {
     const contract = await initializeProvider();
     try {
       // User inputs amount in terms of Ether, convert to Wei before sending to the contract.
      //  const wei = parseEther((item.price)); //'Book',2,'Good book',"www",
       const price1=parseFloat(item.price);
       await contract.registerProduct(item.title,price1,item.desc,item.imgURL);
       const check=await contract.getProducts();
       console.log(check);
     } catch (e) {
       console.log('error adding item: ', e);
     }
}}

async function buy(id,price) {
  console.log("to buy, ",id);
   if (typeof window.ethereum !== 'undefined') {
     const contract = await initializeProvider();
     try {
       // User inputs amount in terms of Ether, convert to Wei before sending to the contract.
      //  const wei = parseEther((item.price)); //'Book',2,'Good book',"www",
      // const price2=(price * 1e18).toString;
      // var price2 = web3.utils.toWei(price.toString(), 'ether')
      await contract.buy(id,{value:parseEther(price.toString())});
      
      await contract.delivery(id);
       const check=await contract.getProducts();
       console.log(check[id]);
     } catch (e) {
       console.log('error buying item: ', e);
     }
}}

function ifSold(item){
  return item.delivered===false;
}

const getItems = async () =>{
    if (typeof window.ethereum !== 'undefined') {
      const contract = await initializeProvider();
      try {
        const items=await contract.getProducts();
         console.log(items)
        const items2=items.filter(ifSold);
        return items2;
      } catch (e) {
        console.log('error getting items: ', e);
      }
 }
}

function ifAcc(item){
  return item.buyer===currentAccount;
}

const getAccItems = async () =>{
  if (typeof window.ethereum !== 'undefined') {
    const contract = await initializeProvider();
    try {
      const items=await contract.getProducts();
       console.log(items)
      const items2=items.filter(ifSold);
      return items2;
    } catch (e) {
      console.log('error getting items: ', e);
    }
}
}


  return (
    <div>
      <Navbar acc={currentAccount} connectWalletHandler={connectWalletHandler} />
      {/* <div style={{ marginTop:10,  marginBottom:10}}>
        {connectWalletButton()}
      </div> */}

      <div style={{textAlign:'center', marginTop:10}}>
      <h1 style={{fontWeight: 'bold'}}>Buyer's Corner</h1>
      </div>

      <div>
        <Home getItems={getItems} buy={buy}/>
      </div>

      <hr></hr>

      <div style={{textAlign:'center', marginBottom:10, marginTop:20}}>
      <h1 style={{fontWeight: 'bold'}}>Seller's Corner</h1>
      </div>

      <div styles={{display:"flex",
      justifyContent:"center",
      alignItems:"center"}}>
      <AddItem onAdd={onAddItem}/>
      </div>
      <br></br>
      

    </div>
    
  );
}

export default App;
