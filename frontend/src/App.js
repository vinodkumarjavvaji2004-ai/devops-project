import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function App() {
  const [success, setSuccess] = useState(0);
  const [failure, setFailure] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await fetch("https://devops-backend-n889.onrender.com/data");
      const data = await res.json();

      setSuccess(data.success || 0);
      setFailure(data.failure || 0);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const total = success + failure;

  const chartData = {
    labels: ["Success", "Failure"],
    datasets: [
      {
        label: "Pipeline Status",
        data: [success, failure],
        backgroundColor: ["green", "red"],
      },
    ],
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h1>DevOps Pipeline Dashboard</h1>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
        <div>
          <h2>Total</h2>
          <p>{total}</p>
        </div>

        <div>
          <h2>Success</h2>
          <p>{success}</p>
        </div>

        <div>
          <h2>Failure</h2>
          <p>{failure}</p>
        </div>
      </div>

      <div style={{ width: "70%", margin: "40px auto" }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default App;