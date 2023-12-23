import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import { jwtHelpers } from "../helpers/jwtHelpers";
import config from "../../config";
import { User } from "../modules/user/user.model";

const authUserFromParam =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      const isUserExist = await User.findById(verifiedUser.userId);

      if (isUserExist) {
        req.user = verifiedUser; // role  , userId
      } else {
        req.user = null;
        throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
      }

      if (verifiedUser.userId === req?.params?.id) {
        next();
      } else {
        throw new ApiError(httpStatus.FORBIDDEN, "Permission denied!");
      }
    } catch (error) {
      next(error);
    }
  };

export default authUserFromParam;
