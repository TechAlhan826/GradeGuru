import React, { useState, useEffect } from "react";
import { LuTrash } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { semesters as defaultSemesters } from "../courses";

const Semester = ({ title, gpa, onChange, onDelete }) => {
  return (
    <div className="semester">
      <h3>{title}</h3>
      <input
        type="number"
        step="0.01"
        placeholder="GPA"
        value={gpa}
        onChange={onChange}
      />
      <LuTrash className="icon" onClick={onDelete} />
      <hr />
    </div>
  );
};

const CGPAPredict = () => {
  const [semesters, setSemesters] = useState([]);

  const [cgpa, setCgpa] = useState(null);

  useEffect(() => {
    const savedSemesters = JSON.parse(localStorage.getItem("semesters"));
    if (savedSemesters) setSemesters(savedSemesters);
    else setSemesters(defaultSemesters);
  }, []);

  const handleSave = () => {
    localStorage.setItem("semesters", JSON.stringify(semesters));
    alert("Semesters saved successfully!");
  };

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    setSemesters((prevSemesters) => {
      const updatedSemesters = [...prevSemesters];
      updatedSemesters[index].gpa = value;
      return updatedSemesters;
    });
  };

  const handleAddSemester = () => {
    setSemesters((prevSemesters) => [
      ...prevSemesters,
      {
        title: `Semester ${prevSemesters.length + 1}`,
        gpa: "",
      },
    ]);
  };

  const handleDeleteSemester = (index) => {
    setSemesters((prevSemesters) => prevSemesters.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((semester) => ({
        ...semester,
        gpa: "",
      }))
    );
  };

  const handleCalculateCGPA = () => {
    const totalGpa = semesters.reduce(
      (sum, semester) => sum + (parseFloat(semester.gpa) || 0),
      0
    );
    const count = semesters.filter((semester) => parseFloat(semester.gpa)).length;
    setCgpa(count === 0 ? 0 : (totalGpa / count).toFixed(2));
  };

  return (
    <div className="calculator">
      <h1>CGPA Predictor</h1>
      <h3 style={{color:"yellow"}}>Anxious about keeping that no-attendance policy with a 9+ CGPA? We've got your back!</h3>
      <form className="GPAForm">
        {semesters.map((semester, index) => (
          <Semester
            key={index}
            title={semester.title}
            gpa={semester.gpa}
            onChange={(e) => handleInputChange(index, e)}
            onDelete={() => handleDeleteSemester(index)}
          />
        ))}
        <div className="controls">
          <button type="button" onClick={handleAddSemester}>
            Add Semester
          </button>
          <hr />
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="button" onClick={handleCalculateCGPA}>
            Calculate CGPA
          </button>
        </div>
      </form>
      {cgpa !== null && <h2>Cumulative Grade Point Average (CGPA): {cgpa}</h2>}
      <h5>Created With <FaHeart /> By <Link style={{cursor:"pointer"}} to="https://techyalhan.in">Mohammed Alhan</Link></h5>
    </div>
  );
};

export default CGPAPredict;
