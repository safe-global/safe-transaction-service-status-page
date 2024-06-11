import { ethers } from "ethers";

type returnBlockInfoType = Promise<ethers.providers.Block>;

// key: blockNumber, value: blockInfoType
type blockCache = Record<string, returnBlockInfoType>;

// key: chainId, value: chainCache
type cacheType = Record<string, blockCache>;

// chache per chainId
let cache: cacheType = {};

let lastTimeCleaned = Date.now();
const THRESHOLD_CLEAN_CACHE_TIME = 20 * 60 * 1000; // purge block cache each 20 mins

// memoized version of getBlock to avoid multiple calls to fetch the same block info
async function memoizedGetBlock(
  blockNumber: number,
  provider: ethers.providers.JsonRpcProvider,
  chainId: string,
): returnBlockInfoType {
  // we clean the cache each 20 mins
  if (Date.now() > lastTimeCleaned + THRESHOLD_CLEAN_CACHE_TIME) {
    cache = {};
    lastTimeCleaned = Date.now();
  }

  // we use the existing chain cache or we create a new one
  cache[chainId] = cache[chainId] || {};
  const chainCache = cache[chainId];

  // we use the cached block value or we call to getBlock and update the chache
  const blockInfo = chainCache[blockNumber] || provider.getBlock(blockNumber);
  chainCache[blockNumber] = blockInfo;

  // if the promise is rejected we retry to call getBlock again
  chainCache[blockNumber].catch(() => {
    chainCache[blockNumber] = provider.getBlock(blockNumber);
  });

  return chainCache[blockNumber];
}

export default memoizedGetBlock;
