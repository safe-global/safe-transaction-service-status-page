import { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

import ServiceStatus from "../ServiceStatus";

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
  const [services, setServices] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    async function getApiData() {
      const response = await fetch(props.configServiceUrl + "/api/v1/chains/", {
        signal: abortController.signal,
      });
      const data = await response.json();
      const chainNameWithUrl = data['results'].reduce(function(map, obj) {
        map[obj.chainName] = obj.transactionService;
        return map;
    }, {});
      setServices(chainNameWithUrl);
    }
    getApiData();
    return () => {
      abortController.abort();
    };
  }, [props.configServiceUrl]);

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
          {Object.entries(services).map(([key, value]) => (
            <ServiceStatus key={key} network={key} url={value}></ServiceStatus>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
