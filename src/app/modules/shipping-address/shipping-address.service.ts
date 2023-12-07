import { IShippingAddress } from "./shipping-address.interface";
import { ShippingAddress } from "./shipping-address.model";

// registering user/student
const createShippingAddress = async (
  payload: IShippingAddress
): Promise<IShippingAddress> => {
  const result = await ShippingAddress.create(payload);

  return result;
};

// get all quiz questions
const getAllShippingAddresss = async (): Promise<IShippingAddress[]> => {
  const result = await ShippingAddress.find({});
  return result;
};

// get single quiz question
const getSingleShippingAddress = async (
  id: string
): Promise<IShippingAddress | null> => {
  const result = await ShippingAddress.findById(id);
  return result;
};

// update user
const updateShippingAddress = async (
  id: string,
  payload: Partial<IShippingAddress>
): Promise<IShippingAddress | null> => {
  const result = await ShippingAddress.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

// delete user
const deleteShippingAddress = async (id: string) => {
  const result = await ShippingAddress.findByIdAndDelete(id);
  return result;
};

export const ShippingAddressService = {
  createShippingAddress,
  getAllShippingAddresss,
  getSingleShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
};
