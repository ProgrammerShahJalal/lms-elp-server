import fetch from "node-fetch";
import { IHeaders } from "./nagad.interface";
import { NagadException } from "./nagad.exception";

interface IPayload {
  [key: string]: unknown;
}

export async function nagadGet<T>(
  url: string,
  additionalHeaders: IHeaders
): Promise<T> {
  const r = await fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      ...additionalHeaders,
    },
  });

  const data = await r.json();

  if (data.devMessage) {
    throw new NagadException(data.devMessage, data.reason);
  }
  if (data.reason) {
    throw new NagadException(data.message, data.reason);
  }
  return data;
}

export async function nagadPost<T>(
  url: string,
  payload: IPayload = {},
  additionalHeaders: IHeaders
): Promise<T> {
  const r = await fetch(url, {
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      ...additionalHeaders,
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const data = await r.json();

  if (data.devMessage) {
    throw new NagadException(data.devMessage, data.reason);
  }

  if (data.reason) {
    throw new NagadException(data.message, data.reason);
  }

  return data;
}
