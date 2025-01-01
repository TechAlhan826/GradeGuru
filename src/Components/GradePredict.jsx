import React, { useState, useEffect } from "react";
import { LuTrash } from "react-icons/lu";
import coursesInitial from "../courses";

const Course = ({ title, name, pholder, val, grade, marks, act, onDelete }) => {
  return (
    <div className="course">
      <h3>{title}</h3>
      <input
        type="number"
        name="val"
        placeholder={pholder}
        value={val}
        onChange={act}
      />
      <input
        type="number"
        name="marks"
        placeholder="Total Weightage Marks"
        value={marks}
        onChange={act}
      />
      <select name="grade" value={grade} disabled>
        <option value="">Select Grade</option>
        <option value="10">S Grade</option>
        <option value="9">A Grade</option>
        <option value="8">B Grade</option>
        <option value="7">C Grade</option>
        <option value="6">D Grade</option>
        <option value="5">E Grade</option>
        <option value="0">F Grade</option>
      </select>
      <LuTrash className="icon" onClick={onDelete} />
      <hr />
    </div>
  );
};

const GradePredict = () => {
  const [courses, setCourses] = useState([]);
  const [gpa, setGpa] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses"));
    if (savedCourses) setCourses(savedCourses);
    else setCourses(coursesInitial);
  }, []);

  // Save data to localStorage explicitly when "Save" is clicked
  const handleSave = () => {
    localStorage.setItem("courses", JSON.stringify(courses));
    alert("Courses saved successfully!");
  };

  // Handle input changes
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      updatedCourses[index][name] = value;

      // Calculate grade based on marks
      if (name === "marks") {
        const marks = parseFloat(value) || 0;
        let grade;
        if (marks >= 90) grade = "10";
        else if (marks >= 80) grade = "9";
        else if (marks >= 70) grade = "8";
        else if (marks >= 60) grade = "7";
        else if (marks >= 55) grade = "6";
        else if (marks >= 50) grade = "5";
        else grade = "0";
        updatedCourses[index]["grade"] = grade;
      }
      return updatedCourses;
    });
  };

  // Add a new course
  const handleAddCourse = () => {
    setCourses((prevCourses) => [
      ...prevCourses,
      {
        key: prevCourses.length + 1,
        title: `Course ${prevCourses.length + 1}`,
        name: "val",
        pholder: "Credits",
        val: "",
        marks: "",
        grade: "",
      },
    ]);
  };

  // Delete a course
  const handleDeleteCourse = (index) => {
    setCourses((prevCourses) => prevCourses.filter((_, i) => i !== index));
  };

  // Reset input fields (but keep props intact)
  const handleReset = () => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => ({
        ...course,
        val: "",
        marks: "",
        grade: "",
      }))
    );
  };

  // Calculate GPA
  const handleCalculateGPA = () => {
    const totalCredits = courses.reduce(
      (sum, course) => sum + (parseFloat(course.val) || 0),
      0
    );
    const weightedGrades = courses.reduce(
      (sum, course) =>
        sum + (parseFloat(course.val) || 0) * (parseFloat(course.grade) || 0),
      0
    );

    if (totalCredits === 0) {
      setGpa(0);
    } else {
      setGpa((weightedGrades / totalCredits).toFixed(2));
    }
  };

  return (
    <div className="calculator">
      <h1>Grade Predictor</h1>
      <h3 style={{color:"red"}}>This predictor is based on absolute grading. Results are approximate
      and subject to change based on class average relative grading.</h3>      
      <form className="GPAForm">
        {courses.map((course, index) => (
          <Course
            key={index} // Fixes unique key issue
            title={course.title}
            name="val"
            pholder={course.pholder}
            val={course.val}
            marks={course.marks}
            act={(e) => handleInputChange(index, e)}
            grade={course.grade}
            onDelete={() => handleDeleteCourse(index)}
          />
        ))}
        <div className="controls">
          <button type="button" onClick={handleAddCourse}>
            Add Course
          </button>
          <hr />
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="button" onClick={handleCalculateGPA}>
            Calculate GPA
          </button>
        </div>
      </form>
      {gpa !== null && <h2>Approximate GPA: {gpa}</h2>}
    </div>
  );
};

export default GradePredict;
