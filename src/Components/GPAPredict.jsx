import React, { useState, useEffect } from "react";
import { LuTrash } from "react-icons/lu";
import coursesInitial from "../courses";

const Course = ({ title, name, pholder, val, grade, act, onDelete }) => {
  return (
    <div className="course">
      <h3>{title}</h3>
      <input
        type="number"
        name={name}
        placeholder={pholder}
        value={val}
        onChange={act}
      />
      <select name="grade" value={grade} onChange={act}>
        <option value="">Select Grade</option>
        <option value="10">S Grade</option>
        <option value="9">A Grade</option>
        <option value="8">B Grade</option>
        <option value="7">C Grade</option>
        <option value="6">D Grade</option>
        <option value="5">E Grade</option>
      </select>
      <LuTrash className="icon" onClick={onDelete} />
      <hr />
    </div>
  );
};

const GPAPredict = () => {
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
        grade: "",
      }))
    );
  };

  // Calculate GPA
  const handleCalculateGPA = () => {
    const totalCredits = courses.reduce((sum, course) => sum + (parseFloat(course.val) || 0),0);
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
      <h1>GPA Predictor</h1>
      <h3 style={{color:"yellow"}}>Curious about no attendance policy? Let the numbers inspire your goals!</h3>
      <form class="GPAForm">
        {courses.map((course, index) => (
          <Course
            key={index} // Fixes unique key issue
            title={course.title}
            name="val"
            pholder={course.pholder}
            val={course.val}
            act={(e) => handleInputChange(index, e)}
            grade={course.grade}
            onDelete={() => handleDeleteCourse(index)}
          />
        ))}
      <div className="controls">
      <button type="button" onClick={handleAddCourse}>
          Add Course
        </button><hr />
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
      {gpa !== null && <h2>Final GPA: {gpa}</h2>}
    </div>
  );
};

export default GPAPredict;
