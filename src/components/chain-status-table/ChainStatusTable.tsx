import { useCallback } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import getChains from "src/api/getChains";
import isValidUrl from "src/utils/isValidUrl";
import Loader from "src/components/loader/Loader";
import useApi from "src/hooks/useApi";
import ChainStatusRow from "src/components/chain-status-table/ChainStatusRow";

type StatusTableProps = {
  configServiceUrl: string;
};

function ChainStatusTable({ configServiceUrl }: StatusTableProps) {
  // endpoint to fetch all chains from the config service
  const fetchChains = useCallback(
    (signal: AbortSignal) => {
      if (isValidUrl(configServiceUrl)) {
        return getChains(configServiceUrl, {
          signal,
        });
      }
      return Promise.resolve([]);
    },
    [configServiceUrl],
  );

  const { isLoading, data: chains } = useApi(fetchChains);

  return (
    <TableContainer component={Paper}>
      <Table aria-label={"transaction service status table"}>
        <caption>Transaction service status for all chains</caption>
        <TableHead>
          <TableRow>
            <TableCell align="center">Logo</TableCell>
            <TableCell align="left">Chain</TableCell>
            <TableCell align="center">Current Block</TableCell>
            <TableCell align="center">ERC20 Block</TableCell>
            <TableCell align="center">MasterCopies Block</TableCell>
            <TableCell align="center">
              <Tooltip title="ERC20 indexer takes care of tracking ERC20 & ERC721 token transfers">
                <Box
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                  whiteSpace="nowrap"
                >
                  <InfoOutlinedIcon fontSize="small" /> ERC20 Synced
                </Box>
              </Tooltip>
            </TableCell>
            <TableCell align="center">
              <Tooltip title="MasterCopies indexer takes care of anything related with the Safe (transactions executed, owners changed...)">
                <Box
                  display="flex"
                  alignItems="center"
                  gap={0.5}
                  whiteSpace="nowrap"
                >
                  <InfoOutlinedIcon fontSize="small" /> MasterCopies Synced
                </Box>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading &&
            chains?.map((chain) => (
              <ChainStatusRow key={chain.chainId} chain={chain} />
            ))}
        </TableBody>
      </Table>

      {/* loader */}
      <Loader
        isLoading={isLoading}
        loadingText={"Loading chains..."}
        minHeight={200}
      />
    </TableContainer>
  );
}

export default ChainStatusTable;
