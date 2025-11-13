import axios, { RawAxiosRequestConfig } from "axios";
import chain from "src/models/chain";
import chainStatus from "src/models/chainStatus";
import { API_TIMEOUT } from "src/config/api";

async function getChainStatus(
  clientGatewayUrl: string,
  chain: chain,
  options?: RawAxiosRequestConfig,
): Promise<chainStatus> {
  const endpoint = `${clientGatewayUrl}/v1/chains/${chain.chainId}/about/indexing`;

  const { data } = await axios.get(endpoint, {
    ...options,
    timeout: API_TIMEOUT,
  });

  return data;
}

export default getChainStatus;
