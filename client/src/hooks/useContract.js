import { useEffect, useState } from "react";
import CourseMarketplaceABI from "../CourseMarketplaceABI.json"; // Ensure this is the correct path
import web3 from "../web3"; // Ensure this imports the correct web3 instance

// Contract address of the deployed contract
const contractAddress = "0xYourDeployedContractAddress";

const useContract = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadContract = async () => {
      const contract = new web3.eth.Contract(
        CourseMarketplaceABI.abi,
        contractAddress
      );
      setContract(contract);
    };

    loadContract().catch((error) => {
      console.error("Failed to load contract:", error);
    });
  }, []);

  return contract;
};

export default useContract;
