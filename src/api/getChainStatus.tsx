import axios, { RawAxiosRequestConfig } from "axios";
import chain from "src/models/chain";
import chainStatus from "src/models/chainStatus";
import { API_TIMEOUT } from "src/config/api";

async function getChainStatus(
  chain: chain,
  options?: RawAxiosRequestConfig,
): Promise<chainStatus> {
  const endpoint = `${chain.transactionService}/api/v1/about/indexing`;

  const { data } = await axios.get(endpoint, {
    ...options,
    timeout: API_TIMEOUT,
  });

  return data;
}

export default getChainStatus;
