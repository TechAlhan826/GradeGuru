import React from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GPAPredict from "./Components/GPAPredict";
import GradePredict from "./Components/GradePredict";
import CGPAPredict from "./Components/CGPAPredict";
import AttendanceCalc from "./Components/AttendanceCalc";

function Home(){
    return (
            <div className="calculator">
                 <h1>GradeGuru - Making academics easier for VITians</h1>
                 <ul>
                    <li><Link to="/gpa-predictor"><button class="items">GPA PREDICTOR</
                    button></Link></li>
                    <li><Link to="/grade-predictor"><button class="items">GRADE PREDICTOR</button></Link></li>
                    <li><Link to="/cgpa-calculator"><button class="items">CGPA CALCULATOR</button></Link></li>
                    <li><Link to="/attendance-calculator"><button class="items">ATTENDANCE CALCULATOR</button></Link></li>
                 </ul>
            </div>
 
    );
}

function App(){
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/gpa-predictor" element={<GPAPredict />} />
                <Route path="/grade-predictor" element={<GradePredict />} />
                <Route path="/cgpa-calculator" element={<CGPAPredict />} />
                <Route path="/attendance-calculator" element={<AttendanceCalc />} />
            </Routes>
        </Router>
    );
}

export default App;