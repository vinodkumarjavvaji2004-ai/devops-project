import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function App() {
  const [chartData, setChartData] = useState(null);
  const [success, setSuccess] = useState(0);
  const [failure, setFailure] = useState(0);

  const loadData = () => {
    fetch("http://localhost:5000/data")
      .then(res => res.json())
      .then(data => {
        setSuccess(data.success);
        setFailure(data.failure);

        setChartData({
          labels: ["Success", "Failure"],
          datasets: [
            {
              label: "Pipeline Status",
              data: [data.success, data.failure],
              backgroundColor: ["green", "red"]
            }
          ]
        });

        if (data.failure > 0) {
          alert("⚠️ Pipeline Failure Detected");
        }
      });
  };

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ width: "800px", margin: "30px auto", textAlign: "center" }}>
      <h1>DevOps Pipeline Dashboard</h1>

      <div style={{display:"flex",justifyContent:"space-around",marginBottom:"30px"}}>
        <div><h2>Total</h2><p>{success + failure}</p></div>
        <div><h2>Success</h2><p>{success}</p></div>
        <div><h2>Failure</h2><p>{failure}</p></div>
      </div>

      {chartData && <Bar data={chartData} />}
    </div>
  );
}

export default App;