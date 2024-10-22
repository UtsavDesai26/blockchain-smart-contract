// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CourseMarketplace {
    struct Course {
        uint id;
        address payable instructor;
        string title;
        string contentURI;
        uint price;
        bool isPublished;
    }

    uint public courseCount;
    mapping(uint => Course) public courses;
    mapping(address => mapping(uint => bool)) public enrolledCourses;

    event CourseCreated(uint id, string title, uint price, address instructor);
    event CoursePurchased(uint courseId, address buyer);

    // Create a new course (only instructors can do this)
    function createCourse(string memory _title, string memory _contentURI, uint _price) public {
        courseCount++;
        courses[courseCount] = Course(courseCount, payable(msg.sender), _title, _contentURI, _price, true);
        emit CourseCreated(courseCount, _title, _price, msg.sender);
    }

    // Buy a course
    function purchaseCourse(uint _courseId) public payable {
        Course memory course = courses[_courseId];
        require(course.isPublished, "Course not available");
        require(msg.value == course.price, "Incorrect value sent");

        enrolledCourses[msg.sender][_courseId] = true;
        course.instructor.transfer(msg.value);

        emit CoursePurchased(_courseId, msg.sender);
    }

    // Check if the user has purchased the course
    function hasPurchased(uint _courseId) public view returns (bool) {
        return enrolledCourses[msg.sender][_courseId];
    }
}
