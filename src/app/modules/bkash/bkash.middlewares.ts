import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { set, unset } from "node-global-storage";
import config from "../../../config";

const bkashAuth = async (req: Request, res: Response, next: NextFunction) => {
  unset("id_token");
  // res.clearCookie("id_token");
  try {
    const { data } = await axios.post(
      config.bkash.grand_token_url as string,
      {
        app_key: config.bkash.app_key,
        app_secret: config.bkash.app_secret_key,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: config.bkash.user_name,
          password: config.bkash.password,
        },
      }
    );

    // res.cookie("id_token", data?.id_token, {
    //   httpOnly: true,
    //   secure: config.env === "production",
    // });

    set("id_token", data?.id_token, { protected: true });
    next();
  } catch (error) {
    next(error);
  }
};

export const BkashMiddlewares = {
  bkashAuth,
};
