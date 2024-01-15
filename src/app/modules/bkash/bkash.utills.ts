import axios from "axios";
import config from "../../../config";
import { get } from "node-global-storage";

const bkashHeaders = async () => {
  return {
    Accept: "application/json",
    Authorization: get("id_token"),
    "X-App-Key": config.bkash.app_key,
  };
};

const getTransactionDetails = async (trx_id: string) => {
  console.log(get("id_token"), "id token");
  const { data } = await axios.post(
    config.bkash.search_transaction_url as string,
    {
      trx_id: trx_id,
    },
    {
      headers: await bkashHeaders(),
    }
  );
  return data;
};

export const BkashUtills = {
  getTransactionDetails,
};
