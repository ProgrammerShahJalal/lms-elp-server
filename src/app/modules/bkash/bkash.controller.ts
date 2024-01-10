import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import config from "../../../config";
import { get } from "node-global-storage";
import ApiError from "../../../errors/ApiError";

const bkashHeaders = async () => {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: get("id_token"),
    "X-App-Key": config.bkash.app_key,
  };
};

const createPayment = async (req: Request, res: Response) => {
  const { amount } = req.body;
  try {
    const { data } = await axios.post(
      config.bkash.create_payment_url as string,
      {
        mode: "0011",
        payerReference: " ",
        callbackURL: `${config.this_site_url}/api/v1/bkash/payment/callback`,
        amount: amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: "Inv-" + uuidv4().substring(0, 6),
      },
      {
        headers: await bkashHeaders(),
      }
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment created successfully!",
      data: data.bkashURL,
    });
  } catch (error) {
    throw new ApiError(httpStatus.OK, "Error creating payment!");
  }
};

const callBack = async (req: Request, res: Response) => {
  const { paymentID, status } = req.query;

  if (status === "cancel" || status === "failure") {
    return res.redirect(
      `${config.frontend_site_url}/bkash/error?message=${status}`
    );
  }

  if (status === "success") {
    try {
      const { data } = await axios.post(
        config.bkash.execute_payment_url as string,
        { paymentID },
        {
          headers: await bkashHeaders(),
        }
      );
      if (data && data.statusCode === "0000") {
        return res.redirect(
          `${config.frontend_site_url}/bkash/success?trx_id=${data.trxID}`
        );
      } else {
        return res.redirect(
          `${config.frontend_site_url}/bkash/error?message=${data?.statusMessage}`
        );
      }
    } catch (error) {
      return res.redirect(
        `${config.frontend_site_url}/bkash/error?message=${
          (error as any)?.message
        }`
      );
    }
  }
};

const checkPaymentStatus = async (req: Request, res: Response) => {
  const { paymentID } = req.body;
  try {
    const { data } = await axios.post(
      config.bkash.query_payment_url as string,
      {
        paymentID,
      },
      {
        headers: await bkashHeaders(),
      }
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment details fetched successfully!",
      data: data,
    });
  } catch (error) {
    throw new ApiError(httpStatus.OK, "Error querying payment!");
  }
};

const getTransactionStatus = async (req: Request, res: Response) => {
  const { trx_id } = req.body;
  try {
    const { data } = await axios.post(
      config.bkash.search_transactioin_url as string,
      {
        trx_id,
      },
      {
        headers: await bkashHeaders(),
      }
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Transaction details fetched successfully!",
      data: data,
    });
  } catch (error) {
    throw new ApiError(httpStatus.OK, "Error querying payment!");
  }
};

export const refund = async (req: Request, res: Response) => {
  const { trx_id } = req.body;

  try {
    const { data: payment } = await axios.post(
      `${
        config.this_site_url as string
      }/api/v1/tokenized/checkout/payment/refund`,
      {
        trxID: trx_id,
      },
      {
        headers: await bkashHeaders(),
      }
    );

    const { data: refund_data } = await axios.post(
      config.bkash.refund_transaction_url as string,
      {
        paymentID: payment?.paymentID,
        amount: Number(payment?.amount),
        trx_id,
        sku: "payment",
        reason: "cashback",
      },
      {
        headers: await bkashHeaders(),
      }
    );

    if (refund_data && refund_data.statusCode === "0000") {
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment refund successfull!",
      });
    } else {
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment refund failed!",
      });
    }
  } catch (error) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Payment refund failed!",
    });
  }
};

export const BkashController = {
  createPayment,
  callBack,
  refund,
  checkPaymentStatus,
};
