import { useCallback, useMemo } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ethers } from "ethers";

import getChainStatus from "src/api/getChainStatus";
import getRpcUri from "src/utils/getRpcUri";
import chain from "src/models/chain";
import useApi from "src/hooks/useApi";
import ChainNameLabel from "src/components/chain-name-label/ChainNameLabel";
import ChainLogo from "src/components/chain-logo/ChainLogo";
import BlockLabel from "src/components/block-label/BlockLabel";
import SyncedLabel from "src/components/synced-label/SyncedLabel";

const POLLING_TIME = 5_000; // 5 secs

function ChainStatusRow({ chain }: { chain: chain }) {
  // endpoint to the chain status from the transaction service
  const fetchChainStatus = useCallback(
    async (signal: AbortSignal) => {
      const transactionServiceUrl = chain.transactionService;

      return getChainStatus(transactionServiceUrl, {
        signal,
      });
    },
    [chain]
  );

  // fetch chain status with a polling (5 secs)
  const { isLoading, data } = useApi(fetchChainStatus, POLLING_TIME);
  const chainStatus = data;

  // memoized eth provider, used to call getBlock info
  const provider = useMemo(() => {
    const rpcEndpoint = getRpcUri(chain.rpcUri);

    return new ethers.providers.JsonRpcProvider(rpcEndpoint);
  }, [chain]);

  // function to fetch the block info from the Rpc
  const getBlockInfo = useCallback(
    async (blockNumber: number) => {
      // TODO: Add improvement here: memoized getBlock function per chainName

      const block = await provider.getBlock(blockNumber);

      return block;
    },
    [provider]
  );

  return (
    <TableRow>
      {/* chain logo */}
      <TableCell align="center">
        <ChainLogo
          logoUri={chain.nativeCurrency.logoUri}
          chainName={chain.chainName}
        />
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
