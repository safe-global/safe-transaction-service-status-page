import axios, { RawAxiosRequestConfig } from "axios";

import chain from "src/models/chain";

const CHAINS_PATHNAME = "/api/v1/chains/";

async function getChains(
  configServiceBaseUrl: string,
  options?: RawAxiosRequestConfig,
): Promise<chain[]> {
  let allChains: chain[] = [];
  let nextUrl: string | null = `${configServiceBaseUrl}${CHAINS_PATHNAME}`;

  while (nextUrl) {
    const { data } = await axios.get(nextUrl, options);

    allChains = allChains.concat(data.results);
    nextUrl = data.next;
  }

  return allChains;
}

export default getChains;
