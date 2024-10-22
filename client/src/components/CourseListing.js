import React, { useEffect, useState } from "react";
import web3 from "../web3";
import useContract from "../hooks/useContract";

const CourseListing = () => {
  const contract = useContract();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      if (contract) {
        const courseCount = await contract.methods.courseCount().call();
        const coursesList = [];
        for (let i = 1; i <= courseCount; i++) {
          const course = await contract.methods.courses(i).call();
          coursesList.push(course);
        }
        setCourses(coursesList);
      }
    };
    loadCourses();
  }, [contract]);

  return (
    <div>
      <h2>Available Courses</h2>
      {courses.map((course) => (
        <div key={course.id}>
          <h3>{course.title}</h3>
          <p>Price: {web3.utils.fromWei(course.price, "ether")} ETH</p>
          <p>
            Content:{" "}
            <a href={course.contentURI} target="_blank">
              View Course
            </a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default CourseListing;
