import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateCourse from "./components/CreateCourse";
import CourseListing from "./components/CourseListing";
import PurchaseCourse from "./components/PurchaseCourse";
import MetaMaskAuth from "./components/MetaMaskAuth";

const App = () => {
  return (
    <Router>
      <div
        style={{
          padding: "20px",
        }}
      >
        <div>
          <h1
            style={{
              cursor: "pointer",
              display: "inline-block",
              marginRight: "20px",
            }}
            onClick={() => window.location.replace("/")}
          >
            Blockchain Course Marketplace
          </h1>
          <button onClick={() => window.location.replace("/create-course")}>
            Create Course
          </button>
        </div>
        <MetaMaskAuth />
        <Routes>
          <Route path="/" element={<CourseListing />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/purchase-course/:id" element={<PurchaseCourse />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
