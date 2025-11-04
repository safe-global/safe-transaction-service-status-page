import { useCallback, useMemo } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Chain, createPublicClient, http } from "viem";

import getChainStatus from "src/api/getChainStatus";
import getRpcUri from "src/utils/getRpcUri";
import chain from "src/models/chain";
import useApi from "src/hooks/useApi";
import ChainNameLabel from "src/components/chain-name-label/ChainNameLabel";
import ChainLogo from "src/components/chain-logo/ChainLogo";
import BlockLabel from "src/components/block-label/BlockLabel";
import SyncedLabel from "src/components/synced-label/SyncedLabel";
import memoizedGetBlock from "src/utils/memoizedGetBlock";

const POLLING_TIME = 5_000; // 5 secs

function ChainStatusRow({
  chain,
  clientGatewayUrl,
}: {
  chain: chain;
  clientGatewayUrl: string;
}) {
  // endpoint to the chain status from the transaction service
  const fetchChainStatus = useCallback(
    async (signal: AbortSignal) => {
      return getChainStatus(clientGatewayUrl, chain, {
        signal,
      });
    },
    [clientGatewayUrl, chain]
  );

  // fetch chain status with a polling (5 secs)
  const { isLoading, data } = useApi(fetchChainStatus, POLLING_TIME);
  const chainStatus = data;

  // memoized eth provider, used to call getBlock info
  const provider = useMemo(() => {
    const rpcEndpoint = getRpcUri(chain);

    return createPublicClient({
      chain: {} as Chain,
      transport: http(rpcEndpoint),
    });
  }, [chain]);

  // function to fetch the block info from the Rpc (memoized version)
  const getBlockInfo = useCallback(
    async (blockNumber: number) => {
      const { chainId } = chain;
      const blockInfo = await memoizedGetBlock(blockNumber, provider, chainId);
      return blockInfo;
    },
    [provider, chain]
  );

  return (
    <TableRow>
      {/* chain logo */}
      <TableCell align="center">
        <ChainLogo logoUri={chain.chainLogoUri} chainName={chain.chainName} />
      </TableCell>

      {/* chain name */}
      <TableCell align="left">
        <ChainNameLabel chainTheme={chain.theme}>
          {chain.chainName}
        </ChainNameLabel>
      </TableCell>

      {/* current block number */}
      <TableCell align="center">
        <BlockLabel
          blockNumber={chainStatus?.currentBlockNumber}
          blockExplorerUriTemplate={chain.blockExplorerUriTemplate}
          getBlock={getBlockInfo}
        />
      </TableCell>

      {/* ERC20 block number */}
      <TableCell align="center">
        <BlockLabel
          blockNumber={chainStatus?.erc20BlockNumber}
          blockExplorerUriTemplate={chain.blockExplorerUriTemplate}
          getBlock={getBlockInfo}
        />
      </TableCell>

      {/* Mastercopy block number */}
      <TableCell align="center">
        <BlockLabel
          blockNumber={chainStatus?.masterCopiesBlockNumber}
          blockExplorerUriTemplate={chain.blockExplorerUriTemplate}
          getBlock={getBlockInfo}
        />
      </TableCell>

      {/* ERC20 Synced indicator */}
      <TableCell align="center">
        <SyncedLabel
          isLoading={isLoading || !chainStatus}
          isSynced={chainStatus?.erc20Synced}
          currentBlockNumber={chainStatus?.currentBlockNumber}
          lastBlockNumber={chainStatus?.erc20BlockNumber}
        />
      </TableCell>

      {/* MasterCopies Synced indicator */}
      <TableCell align="center">
        <SyncedLabel
          isLoading={isLoading || !chainStatus}
          isSynced={chainStatus?.masterCopiesSynced}
          currentBlockNumber={chainStatus?.currentBlockNumber}
          lastBlockNumber={chainStatus?.masterCopiesBlockNumber}
        />
      </TableCell>
    </TableRow>
  );
}

export default ChainStatusRow;
