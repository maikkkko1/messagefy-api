require("dotenv").config({
  path: process.env.NODE_ENV == "test" ? ".env.test" : ".env",
});

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.NODE_ENV == "test" ? "sqlite" : "mysql",
  logging: false,
  // Test environment
  storage: "./__tests__/testDb/:test_db_in_memory",
};
