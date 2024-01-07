import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";
import { IShippingAddress } from "./shipping-address.interface";
import { ShippingAddress } from "./shipping-address.model";

// creating shipping address
const createShippingAddress = async (
  payload: IShippingAddress
): Promise<IShippingAddress> => {
  const { user_id } = payload;
  const user = await User.findById(user_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  const result = await ShippingAddress.create(payload);

  return result;
};

// get all shipping address
const getAllShippingAddresss = async (): Promise<IShippingAddress[]> => {
  const result = await ShippingAddress.find({});
  return result;
};

// get single shipping address
const getSingleShippingAddress = async (
  id: string,
  user_id: string
): Promise<IShippingAddress | null> => {
  const shipping_address = await ShippingAddress.findById(id);

  if (shipping_address?.user_id.toString() !== user_id.toString()) {
    throw new ApiError(httpStatus.OK, "Unauthorized!");
  }
  return shipping_address;
};

// get my shipping address
const getMyShippingAddress = async (
  user_id: string
): Promise<IShippingAddress | null> => {
  const shipping_address = await ShippingAddress.findOne({
    user_id,
  });

  if (!shipping_address) {
    throw new ApiError(httpStatus.OK, "No shipping address found!");
  }

  return shipping_address;
};

// update shipping address
const updateShippingAddress = async (
  payload: Partial<IShippingAddress>
): Promise<IShippingAddress | null> => {
  const result = await ShippingAddress.findOneAndUpdate(
    { user_id: payload?.user_id },
    payload,
    {
      upsert: true,
      new: true,
    }
  );

  return result;
};

// delete shipping address
const deleteShippingAddress = async (id: string) => {
  const result = await ShippingAddress.findByIdAndDelete(id);
  return result;
};

export const ShippingAddressService = {
  createShippingAddress,
  getAllShippingAddresss,
  getMyShippingAddress,
  getSingleShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
