import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Payment } from "./payment.model";
import config from "../../../config";
import axios from "axios";

const validPayment = async (payload: {
  trx_id?: string;
  payment_ref_id?: string;
}) => {
  const { trx_id, payment_ref_id } = payload;
  try {
    let validPayment;
    if (trx_id) {
      validPayment = await Payment.findOne({ trxID: trx_id });
      if (!validPayment) {
        throw new ApiError(httpStatus.OK, "Invalid transaction id!");
      }
    } else if (payment_ref_id) {
      const { data: payment } = await axios.get(
        `${config.this_site_url}/api/v1/nagad/payment/verify/${payment_ref_id}`
      );
      await Payment.create({
        payment_ref_id,
        amount: payment?.data?.amount,
        customerMsisdn: payment?.data?.clientMobileNo,
      });
      validPayment = payment?.data;
    } else {
      throw new ApiError(
        httpStatus.OK,
        "Transaction id or Payment ref id must be valid!"
      );
    }

    return validPayment;
  } catch (error) {
    throw new ApiError(httpStatus.OK, `Payment not verified! ${error}`);
  }
};

export const PaymentUtills = {
  validPayment,
};
