const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

const initialPort = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    startServer(initialPort); // Start server after DB connects
  })
  .catch((err) => console.error("Mongo error: ", err));

// Auto port retry function
function startServer(port) {
  const server = app
    .listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.warn(`Port ${port} in use. Trying ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error("Server error:", err);
      }
    });
}
