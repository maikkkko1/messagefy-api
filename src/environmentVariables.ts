/** Workaround to TS find the env variables. */

require("dotenv").config({
  path: process.env.NODE_ENV == "test" ? ".env.test" : ".env",
});

export const { PORT, DB_HOST, DB_USER, DB_NAME, DB_PASS, SECRET } = process.env as {
  [key: string]: string;
};
