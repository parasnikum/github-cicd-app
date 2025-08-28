require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.error("DB connection error:", err));

const webhookSchema = new mongoose.Schema({
  payload: { type: Object, required: true },
  receivedAt: { type: Date, default: Date.now }
});

const Webhook = mongoose.model("Webhook", webhookSchema);

app.get("/", async (req, res) => {
  try {
    console.log("req come");
    const webhookEntry = new Webhook({ payload: req.body });
    const savedEntry = await webhookEntry.save();
    console.log("Webhook saved:", savedEntry);
    res.json({ success: true, data: savedEntry });
  } catch (error) {
    console.error("Error saving webhook:", error);
    res.status(500).json({ success: false, error: "Failed to save webhook data" });
  }
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
