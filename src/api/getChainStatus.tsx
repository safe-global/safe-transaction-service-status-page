import axios, { AxiosRequestConfig } from "axios";

import chainStatus from "src/models/chainStatus";

const CHAIN_STATUS_PATHNAME = "/api/v1/about/indexing/";

async function getChainStatus(
  transactionServiceBaseUrl: string,
  options?: AxiosRequestConfig
): Promise<chainStatus> {
  const endpoint = `${transactionServiceBaseUrl}${CHAIN_STATUS_PATHNAME}`;

  const { data } = await axios.get(endpoint, options);

  return data;
}

export default getChainStatus;
