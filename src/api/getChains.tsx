import axios, { RawAxiosRequestConfig } from "axios";

import chain from "src/models/chain";

const CHAINS_PATHNAME = "/api/v1/chains/";

async function getChains(
  configServiceBaseUrl: string,
  options?: RawAxiosRequestConfig
): Promise<chain[]> {
  const endpoint = `${configServiceBaseUrl}${CHAINS_PATHNAME}`;

  const { data } = await axios.get(endpoint, options);

  return data.results;
}

export default getChains;
