import { useState, useEffect } from "react";
import web3 from "../web3";

const useMetaMask = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    getAccount();
  }, []);

  return account;
};

export default useMetaMask;
