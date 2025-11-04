import axios, { RawAxiosRequestConfig } from "axios";
import chain from "src/models/chain";

import chainStatus from "src/models/chainStatus";

async function getChainStatus(
  clientGatewayUrl: string,
  chain: chain,
  options?: RawAxiosRequestConfig
): Promise<chainStatus> {
  let endpoint = "";
  if (chain.chainId === "1") {
    endpoint = `${chain.transactionService}/api/v1/about/indexing`;
  } else {
    endpoint = `${clientGatewayUrl}/v1/chains/${chain.chainId}/about/indexing`;
  }

  const { data } = await axios.get(endpoint, options);

  return data;
}

export default getChainStatus;
