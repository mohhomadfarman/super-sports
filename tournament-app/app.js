// app.js
const express = require("express");
const mongoose = require("mongoose");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require('cors')
const authRoutes = require("./routes/authRoutes");
const cityRoutes = require("./routes/cityRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const matchRoutes = require("./routes/matchRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const contestRoutes = require("./routes/contestRoutes");
const joinedContestRoutes = require("./routes/joinedContestRoutes");
const { mongoURI, port } = require("./config");
require("dotenv").config();
const app = express();
app.use(cors())
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Tournament Management API",
      version: "1.0.0",
      description: "API documentation for the Tournament Management application",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/uploads', express.static('uploads'));

app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/joinedContests", joinedContestRoutes);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = port || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
