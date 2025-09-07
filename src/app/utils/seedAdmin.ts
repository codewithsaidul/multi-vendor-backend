/* eslint-disable no-console */
import { envVars } from "../config/env";
import bcrypt from "bcrypt";
import User from "../modules/user/user.modal";
import { IUser, UserRole } from "../modules/user/user.interface";

export const seedAdmin = async () => {
  try {
    const isAdminExist = await User.findOne({ role: "admin" });

    if (isAdminExist) {
      console.log("Admin already exists.");
      return null;
    }

    const hashPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD as string,
      parseInt(envVars.BCRYPT_SALT_ROUND as string)
    );


    const adminInfo: IUser = {
        email: envVars.ADMIN_EMAIL,
        password: hashPassword,
        role: UserRole.ADMIN,
    }


    await User.create(adminInfo);

    console.log("Admin seeded successfully.");

  } catch (error) {
    console.log(error);
  }
};