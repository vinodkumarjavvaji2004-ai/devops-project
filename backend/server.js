const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});