import React, { useState } from "react";
import web3 from "../web3";
import useContract from "../hooks/useContract";
import useMetaMask from "../hooks/useMetaMask";

const CreateCourse = () => {
  const contract = useContract();
  const account = useMetaMask();
  const [title, setTitle] = useState("");
  const [contentURI, setContentURI] = useState("");
  const [price, setPrice] = useState("");

  const createCourse = async (e) => {
    e.preventDefault();
    if (contract && account) {
      await contract.methods
        .createCourse(title, contentURI, web3.utils.toWei(price, "ether"))
        .send({ from: account });
      alert("Course created successfully!");
    }
  };

  return (
    <form onSubmit={createCourse}>
      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Content URI"
        value={contentURI}
        onChange={(e) => setContentURI(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price in ETH"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Create Course</button>
    </form>
  );
};

export default CreateCourse;
