export interface IHeaders {
  "X-KM-Api-Version": string;
  "X-KM-Client-Type"?: IClientType;
  "X-KM-IP-V4"?: string;
}

export type IClientType =
  | "PC_WEB"
  | "MOBILE_WEB"
  | "MOBILE_APP"
  | "WALLET_WEB_VIEW"
  | "BILL_KEY";

export interface IConfirmPaymentArgs {
  paymentReferenceId: string;
  challenge: string;
  orderId: string;
  amount: string;
  productDetails: Record<string, string>;
  ip: string;
}

export interface INagadCreatePaymentBody extends Record<string, string> {
  accountNumber: string;
  dateTime: string;
  sensitiveData: string;
  signature: string;
}

export interface INagadSensitiveData extends Record<string, string> {
  /** Merchant ID */
  merchantId: string;
  datetime: string;
  orderId: string;
  challenge: string;
}

/**
 * ### Nagad Payment Creation Argument lists
 * ### Required Properties:
 * - orderID `string`
 * - amount `string`
 * - productDetails `object`
 * - ip `string`
 * - clientType `enum`
 */

export interface ICreatePaymentArgs {
  /**
   * `Merchant Order ID`
   */
  orderId: string;
  /**
   * `Amount in String` **BDT**
   */
  amount: string;
  /**
   * ### Additional Details for product
   * `Accepts an object`
   */
  productDetails: Record<string, string>;
  /**
   * **Client IP ADDRESS**
   */
  ip: string;
  /**
   * ### Client Type
   * **Possible Values**:
   * - `'PC_WEB'`
   * - `'MOBILE_WEB'`
   * - `'MOBILE_APP'`
   * - `'WALLET_WEB_VIEW'`
   * - `'BILL_KEY'`
   */
  clientType: IClientType;
}

export interface INagadCreatePaymentResponse {
  sensitiveData: string;
  signature: string;
}

export interface INagadCreatePaymentDecryptedResponse {
  paymentReferenceId: string;
  acceptDateTime: string;
  challenge: string;
}

export interface INagadPaymentURL {
  callBackUrl: string;
}

export interface INagadPaymentVerificationResponse {
  merchantId: string;
  orderId: string;
  paymentRefId: string;
  amount: string;
  clientMobileNo: string | null;
  merchantMobileNo: string;
  orderDateTime: string | null;
  issuerPaymentDateTime: string;
  issuerPaymentRefNo: string;
  additionalMerchantInfo: string | null;
  status: string;
  statusCode: string;
}
