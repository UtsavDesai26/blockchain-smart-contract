import React, { useEffect, useState } from "react";

const MetaMaskAuth = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");

  const loadAccount = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setError("");
      } catch (err) {
        setError("Could not connect to MetaMask. Please try again.");
      }
    } else {
      setError("MetaMask is not installed. Please install it to use this app.");
    }
  };

  useEffect(() => {
    loadAccount();
  }, []);

  return (
    <div>
      {account ? (
        <div>
          <h3>Connected Account</h3>
          <p>{account}</p>
        </div>
      ) : (
        <button onClick={loadAccount}>Connect to MetaMask</button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default MetaMaskAuth;
