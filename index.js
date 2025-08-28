const express = require("express");

const app = express();

// Middleware to parse JSON body
app.use(express.json());
app.get("/", (req, res) => {
  res.send("welcome to the Github Ci-cd Test Page")
})
// Start server
app.listen(3000, () => {
  console.log("Running on port 3000");
});
