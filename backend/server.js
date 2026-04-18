const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/data", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.github.com/repos/facebook/react/actions/runs"
    );

    const runs = response.data.workflow_runs;

    let success = runs.filter(
      run => run.conclusion === "success"
    ).length;

    let fail = runs.filter(
      run => run.conclusion === "failure"
    ).length;

    res.json({
      success: success,
      failure: fail
    });

  } catch (error) {
    res.json({
      error: "Failed to fetch data"
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});