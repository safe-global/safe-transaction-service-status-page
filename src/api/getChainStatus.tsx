import axios, { RawAxiosRequestConfig } from "axios";

import chainStatus from "src/models/chainStatus";

async function getChainStatus(
  clientGatewayUrl: string,
  chainId: number,
  options?: RawAxiosRequestConfig
): Promise<chainStatus> {
  const endpoint = `${clientGatewayUrl}/v1/chains/${chainId}/about/indexing`;

  const { data } = await axios.get(endpoint, options);

  return data;
}

export default getChainStatus;
