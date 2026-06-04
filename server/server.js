const express = require("express");
const http = require("http");

const dbConnection = require("./db/dbConnect");
require("dotenv").config();
const cors = require("cors");
const app = express();

// ✅ Keep only one CORS config here
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK");
});
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// ✅ Your routes
app.use("/user", require("./routes/user"));
app.use("/room", require("./routes/room"));
app.use("/book", require("./routes/book")); 
app.use("/chat", require("./routes/chat"));
app.use("/admin", require("./routes/admin.route")) ;


const server = http.createServer(app);

server.listen(PORT, "0.0.0.0", () => {
  dbConnection();
  console.log(`SERVER RUNNING ON ${PORT}`);
});