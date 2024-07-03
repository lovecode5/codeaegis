import { Sequelize } from "sequelize";

const sequelize = new Sequelize("companyDB", "root", "Is18071995$", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
