import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { User } from "../modules/user/user.model";

const authPermission =
  (requiredPermission: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const verifiedUser = await User.findById(req?.user?.userId);

      if (verifiedUser?.role === "super_admin") {
        next();
      }

      if (
        verifiedUser?.permission &&
        verifiedUser?.permission.includes(requiredPermission)
      ) {
        next();
      } else {
        throw new ApiError(httpStatus.OK, "Unauthorized permission!");
      }
    } catch (error) {
      next(error);
    }
  };

export default authPermission;
