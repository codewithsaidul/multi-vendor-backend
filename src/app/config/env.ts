import dotenv from "dotenv";
dotenv.config();

interface ENVCONFIG {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  BCRYPT_SALT_ROUND: string;

  JWT: {
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRATION_TIME: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRATION_TIME: string;
  },

  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  MANAGER_EMAIL: string;
  MANAGER_PASSWORD: string;
  USER_EMAIL: string;
  USER_PASSWORD: string;
}

const loadEnvVariable = (): ENVCONFIG => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "BCRYPT_SALT_ROUND",

    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRATION_TIME",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRATION_TIME",

    "ADMIN_EMAIL",
    "ADMIN_PASSWORD",
    "MANAGER_EMAIL",
    "MANAGER_PASSWORD",
    "USER_EMAIL",
    "USER_PASSWORD",
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,

    JWT: {
      JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
      JWT_ACCESS_EXPIRATION_TIME: process.env.JWT_ACCESS_EXPIRATION_TIME as string,
      JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
      JWT_REFRESH_EXPIRATION_TIME: process.env.JWT_REFRESH_EXPIRATION_TIME as string,
    },

    
    ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
    MANAGER_EMAIL: process.env.MANAGER_EMAIL as string,
    MANAGER_PASSWORD: process.env.MANAGER_PASSWORD as string,
    USER_EMAIL: process.env.USER_EMAIL as string,
    USER_PASSWORD: process.env.USER_PASSWORD as string,
  };
};

export const envVars = loadEnvVariable();