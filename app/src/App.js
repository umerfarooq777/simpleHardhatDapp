import { useState,useEffect } from 'react';
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import {ethers} from "ethers"

import './App.css';

function App() {
  const [greeting,doGreeting]=useState(null);
  const [contract,setContract]=useState(null);
  const [provider,setProvider]=useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      // let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const url = "http://localhost:8545";
      const providerEth = new ethers.providers.JsonRpcProvider(url);
      const contractEth = new ethers.Contract(
        contractAddress,
        Greeter.abi,
        providerEth
      );
      setProvider(providerEth);
      setContract(contractEth);
      // console.log(contractEth);
    };
    loadProvider();
  }, []);


  useEffect(() => {
    const getGreetings = async () => {
      const greeting = await contract.greet();
      doGreeting(greeting);
    };
    contract && getGreetings();
  }, [contract]);


  const changeGreetings = async () => {
    const input = document.querySelector("#message");
    const signer = contract.connect(provider.getSigner());
    signer.setGreeting(input.value);
    setTimeout(function () {
      window.location.reload(1);
    }, 500);
    setTimeout();
  };

  return (
    <div className="center">
      <h3>{greeting}</h3>
      <input className="input" type="text" id="message"></input>
      <button className="button" onClick={changeGreetings}>
        Change
      </button>
    </div>
  );
}

export default App;
