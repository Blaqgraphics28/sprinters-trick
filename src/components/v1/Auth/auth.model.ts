import { Document, Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { IToken } from "../../../types";
import appConfig from "../../../configs";
import platformConstants from "../../../configs/platformConstants";

const { authConfigs, hashPepper } = appConfig;

export interface IAuth extends Document {
  User: Types.ObjectId;
  password: string;
  role: (typeof platformConstants.userRole)[number];
  comparePassword(password: string): boolean;

  generateToken(args: {
    data: IToken;
    expiresIn?: number;
    audience?: "web" | "app";
  }): string;
}

const authSchema = new Schema<IAuth>(
  {
    User: { type: Schema.Types.ObjectId, ref: "User" },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: platformConstants.userRole,
    },
  },
  { timestamps: true }
);

authSchema.pre<IAuth>("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(authConfigs.saltRounds);

      const hashedPassword = await bcrypt.hash(
        this.password + hashPepper,
        salt
      );
      this.password = hashedPassword;
    }

    next();
  } catch (err: any) {
    return next(err);
  }
});

authSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password + hashPepper, this.password);
};

authSchema.methods.generateToken = ({
  data,
  expiresIn = authConfigs.sessionLifeSpan,
  audience = "web",
}: {
  data: IToken;
  expiresIn?: number;
  audience?: "web";
}): string =>
  jwt.sign(data, authConfigs.jwtSecret, {
    expiresIn,
    issuer: `sprinters-${appConfig.environment}`,
    audience: `${audience}-user`,
  });

export const AuthModel = model<IAuth>("Auth", authSchema);
