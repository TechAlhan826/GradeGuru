import React, { useState } from "react";

function Forms() {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [data, setData] = useState("");
  const [qrImageUrl, setQrImageUrl] = useState(""); // Store generated QR code URL

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    setQrImageUrl(formsubmit(width, height, data)); // Update QR code URL
  };
  

  return ( 
    <div className="form">
      <h1>QR Code Generator</h1>

      <img src={qrImageUrl} alt="QR Code" /> // Display QR code using state

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="width"
          placeholder="Enter Width"
          value={width} // Set input value from state
          onChange={(e) => setWidth(e.target.value)} // Update state on change
        />
        <input
          type="number"
          name="height"
          placeholder="Enter Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="text"
          name="data"
          placeholder="Enter Data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        
<button type="submit">Get Qr</button>

      </form>
    </div>
  );
  }

function formsubmit(w, h, d) {
  const baseUrl = "https://chart.googleapis.com/chart?cht=qr&chs=";
  const size = w + "x" + h;
  const data = "&chl=" + encodeURIComponent(d);
  const gqrApi = baseUrl + size + data;
  return gqrApi;
}

export default Forms;