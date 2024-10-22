import React from "react";
import web3 from "../web3";
import useContract from "../hooks/useContract";
import useMetaMask from "../hooks/useMetaMask";

const PurchaseCourse = ({ courseId, price }) => {
  const contract = useContract();
  const account = useMetaMask();

  const purchaseCourse = async () => {
    if (contract && account) {
      await contract.methods.purchaseCourse(courseId).send({
        from: account,
        value: web3.utils.toWei(price, "ether"),
      });
      alert("Course purchased successfully!");
    }
  };

  return <button onClick={purchaseCourse}>Purchase Course</button>;
};

export default PurchaseCourse;
