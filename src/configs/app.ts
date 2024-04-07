import cors from "cors";
import express, { Application, NextFunction, Response, Request } from "express";
import helmet from "helmet";
import appConfig from ".";
import { upload } from "./fileUpload.config";

import { connectMongoDb } from "./persistence/database";
import { handleResponse } from "../utils/response";
import v1Routers from "../components/v1/v1Routes";
import { v2 } from "cloudinary";
import { IRequest } from "src/types";
import SEEDING from "./persistence/seeder";
import sendMail from "./email/email.config";

const app: Application = express();
const { cloudName, cloudinaryApiKey, cloudinaryApiSecret } = appConfig;

const initializePersistenceAndSeeding = async () => {
  connectMongoDb().catch((err: any) => console.log(err, "error"));
  await SEEDING();
  // await sendMail().then((e) => {
  //   console.log("e  ", e);
  // });
};

const initializeMiddlewares = () => {
  const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "https://sprinterstechnologies.com",
    "https://www.sprinterstechnologies.com",
    "https://sprinterz.netlify.app",
    "https://sprinterz.vercel.app",
  ];

  const corsOptions = {
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  app
    .use(cors(corsOptions))
    // .use(upload.any())
    .use(express.urlencoded({ extended: false }))
    .use(helmet())
    .use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (req.method === "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "POST, PUT, PATCH, GET, DELETE"
        );
        return handleResponse({
          res,
          status: 403,
          message: "Invalid header method",
        });
      }

      if (req.body && err instanceof SyntaxError) {
        return res.status(400).json({
          message: "Malformed JSON, check the body of the request",
        });
      }

      return next();
    })
    .use(express.json())
    .use((req: IRequest, res: Response, next: NextFunction) => {
      v2.config({
        cloud_name: cloudName,
        api_key: cloudinaryApiKey,
        api_secret: cloudinaryApiSecret,
      });

      next();
    });
};

const initializeRoutes = () => {
  app.use("/v1", v1Routers);

  app.get("/", (_req, res) => {
    res.json({ message: "welcome to the Sprinters!" });
  });

  app.all("*", (_req, res: Response) =>
    handleResponse({
      res,
      status: 404,
      message: "You have used an invalid method or hit an invalid route",
    })
  );
};

initializePersistenceAndSeeding();
initializeMiddlewares();
initializeRoutes();

export default app;
