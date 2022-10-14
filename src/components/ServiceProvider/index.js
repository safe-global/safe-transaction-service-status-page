import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

import ServiceStatus from "../ServiceStatus";

const SERVICES = {
  ARBITRUM: "https://safe-transaction.arbitrum.gnosis.io",
  AURORA: "https://safe-transaction.aurora.gnosis.io",
  AVALANCHE: "https://safe-transaction.avalanche.gnosis.io",
  BINANCE: "https://safe-transaction.bsc.gnosis.io",
  EWC: "https://safe-transaction.ewc.gnosis.io",
  GNOSISCHAIN: "https://safe-transaction.xdai.gnosis.io",
  GOERLI: "https://safe-transaction.goerli.gnosis.io",
  MAINNET: "https://safe-transaction.mainnet.gnosis.io",
  OPTIMISM: "https://safe-transaction.optimism.gnosis.io",
  POLYGON: "https://safe-transaction.polygon.gnosis.io",
  RINKEBY: "https://safe-transaction.rinkeby.gnosis.io",
  VOLTA: "https://safe-transaction.volta.gnosis.io",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#DCDCDC",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function ServiceProvider(props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>network</StyledTableCell>
            <StyledTableCell>currentBlockNumber</StyledTableCell>
            <StyledTableCell>erc20BlockNumber</StyledTableCell>
            <StyledTableCell>masterCopiesBlockNumber</StyledTableCell>
            <StyledTableCell>erc20Synced</StyledTableCell>
            <StyledTableCell>masterCopiesSynced</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(SERVICES).map(([key, value]) => (
            <ServiceStatus key={key} network={key} url={value}></ServiceStatus>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
