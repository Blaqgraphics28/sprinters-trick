import { startSession } from "mongoose";
import { UserModel } from "../../components/v1/Users/user.model";
import appConfig from "..";
import { AuthModel } from "../../components/v1/Auth/auth.model";

const seeding = async () => {
  const session = await startSession();
  session.startTransaction();

  const { admin } = appConfig;
  try {
    const userExist = await UserModel.findOne().session(session);
    if (userExist) {
      await session.abortTransaction();
      session.endSession();

      return;
    }

    console.log("seeding now......");

    const user = await new UserModel({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
    }).save({ session });

    await new AuthModel({
      User: user._id,
      password: admin.password,
      role: admin.role,
    }).save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log("Seeding complete ✅");
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    console.log("error seeding data to DB " + err);
  }
};

export default seeding;
