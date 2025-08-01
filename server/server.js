const express = require("express");
const http = require("http");

const dbConnection = require("./db/dbConnect");
require("dotenv").config();
const cors = require("cors");
const app = express();

// ✅ Keep only one CORS config here
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

const PORT = process.env.PORT || 5000;
dbConnection();

app.use(express.json());
app.use("/landlord",router)

// ✅ Your routes
app.use("/user", require("./routes/user"));
app.use("/room", require("./routes/room"));
app.use("/book", require("./routes/book")); 
app.use("/chat", require("./routes/chat"));

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}...`);
});
