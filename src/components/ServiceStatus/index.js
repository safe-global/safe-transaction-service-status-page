import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import WarningIcon from "@mui/icons-material/Warning";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function ServiceStatus(props) {
  const [apiResult, setApiResult] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    async function getApiData() {
      const response = await fetch(props.url + "/api/v1/about/indexing/", {
        signal: abortController.signal,
      });
      const data = await response.json();
      setApiResult(data);
    }
    getApiData();
    const interval = setInterval(getApiData, 1000 * 30);
    return () => {
      abortController.abort();
      clearInterval(interval);
    };
  }, [props.url]);

  const greenStyle = { backgroundColor: "#8bc34a" };
  const redStyle = { backgroundColor: "#ff7961" };

  return (
    <TableRow>
      <TableCell>{props.network}</TableCell>
      <TableCell>{apiResult.currentBlockNumber}</TableCell>
      <TableCell>{apiResult.erc20BlockNumber}</TableCell>
      <TableCell>{apiResult.masterCopiesBlockNumber}</TableCell>
      <TableCell style={apiResult.erc20Synced ? greenStyle : redStyle}>
        {apiResult.erc20Synced ? <CheckIcon /> : <WarningIcon />}
      </TableCell>
      <TableCell style={apiResult.masterCopiesSynced ? greenStyle : redStyle}>
        {apiResult.masterCopiesSynced ? <CheckIcon /> : <WarningIcon />}
      </TableCell>
    </TableRow>
  );
}
