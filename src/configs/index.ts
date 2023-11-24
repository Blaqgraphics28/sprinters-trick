import "dotenv/config";
import ms from "ms";

const { env } = process;

const appConfig = {
  isDev: env.NODE_ENV === "development",
  mongoDbUri: env.dbUri || "",
  environment: env.NODE_ENV,
  port: Number(env.PORT) || 6080,
  hashPepper: env.HashPepper,
  authConfigs: {
    saltRounds: 10,
    jwtSecret: env.jwtSecret || "",
    sessionLifeSpan: ms("2days"),
    maxInactivity: ms("12h"),
  },
};

export default appConfig;
