import { Server } from "http";
import app from "./app";
import config from "./config";
import mongoose from "mongoose";

// const uri = `mongodb://localhost:27017/easy_learning_platform`;
const uri = `${config.mongodb.url}`;

async function bootstrap() {
  try {
    await mongoose.connect(uri);
    console.log("DB connected!");
  } catch (error) {
    console.log("Mongodb error!", error);
  }
  const server: Server = app.listen(config.port, () => {
    console.log(`Server is running on port: ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log("Server closed!");
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  process.on("SIGTERM", () => {
    console.log("SIGTERM received!");
    if (server) {
      server.close();
    }
  });
}

bootstrap();
