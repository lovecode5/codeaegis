import express from "express";
import sequelize from "./config/database.js";
import apiRoutes from "./routes/routes.js";

const app = express();
app.use(express.json());

app.use("/api", apiRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
