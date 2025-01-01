import React, { useState } from "react";

const AttendanceCalc = () => {
  const [classesAttended, setClassesAttended] = useState("");
  const [totalClasses, setTotalClasses] = useState("");
  const [leaveDays, setLeaveDays] = useState("");
  const [result, setResult] = useState(null);

  const calculateAttendance = () => {
    const attended = parseFloat(classesAttended) || 0;
    const total = parseFloat(totalClasses) || 0;
    const leaves = parseFloat(leaveDays) || 0;

    const projectedTotal = total + leaves;
    const percentage = ((attended / projectedTotal) * 100).toFixed(2);

    setResult(percentage);
  };

  return (
    <div className="calculator">
      <h1>Attendance Calculator</h1>
      <h3 style={{color:"red"}}>Thinking of skipping a class? Ensure your attendance stays on track</h3>
      <form className="GPAForm">
        <div className="form-group">
          <label>Number of Classes Attended</label>
          <input
            type="number"
            value={classesAttended}
            onChange={(e) => setClassesAttended(e.target.value)}
            placeholder="Enter attended classes"
          />
        </div>
        <div className="form-group">
          <label>Total Number of Classes</label>
          <input
            type="number"
            value={totalClasses}
            onChange={(e) => setTotalClasses(e.target.value)}
            placeholder="Enter total classes"
          />
        </div>
        <div className="form-group">
          <label>How Many Days You Need to Take Leave</label>
          <input
            type="number"
            value={leaveDays}
            onChange={(e) => setLeaveDays(e.target.value)}
            placeholder="Enter leave days"
          />
        </div>
        <div className="controls">
        <button type="button" onClick={calculateAttendance}>
          Calculate Attendance
        </button>
        </div>
      </form>
      {result !== null && (
        <h2
          style={{
            color: result >= 74.5 ? "green" : "red",
          }}
        >
          Attendance Percentage: {result}%
        </h2>
      )}
    </div>
  );
};

export default AttendanceCalc;
