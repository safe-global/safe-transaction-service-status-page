import './App.css';
import Container from '@mui/material/Container';

import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const SERVICES = {
  ARBITRUM: 'https://safe-transaction.arbitrum.gnosis.io',
  AVALANCHE: 'https://safe-transaction.avalanche.gnosis.io',
  BINANCE: 'https://safe-transaction.bsc.gnosis.io',
  EWC: 'https://safe-transaction.ewc.gnosis.io',
  GNOSISCHAIN: 'https://safe-transaction.xdai.gnosis.io',
  GOERLI: 'https://safe-transaction.goerli.gnosis.io',
  MAINNET: 'https://safe-transaction.mainnet.gnosis.io',
  OPTIMISM: 'https://safe-transaction.optimism.gnosis.io',
  POLYGON: 'https://safe-transaction.polygon.gnosis.io',
  RINKEBY: 'https://safe-transaction.rinkeby.gnosis.io',
  VOLTA: 'https://safe-transaction.volta.gnosis.io',
}

const theme = createTheme();

function ServiceStatus(props) {
  const [apiResult, setApiResult] = useState({})

  useEffect(() => {
    async function getApiData() {
      const response = await fetch(props.url + "/api/v1/about/indexing/")
      const data = await response.json()
      setApiResult(data)
    }
    getApiData()
    const interval = setInterval(getApiData, 1000 * 30)
    return () => clearInterval(interval);
  }, [props.url]);

  const greenStyle = {backgroundColor: '#8bc34a'}
  const redStyle = {backgroundColor: '#ff7961'}

  return (
    <TableRow>
      <TableCell>{props.network}</TableCell>
      <TableCell>{apiResult.currentBlockNumber}</TableCell>
      <TableCell>{apiResult.erc20BlockNumber}</TableCell>
      <TableCell>{apiResult.masterCopiesBlockNumber}</TableCell>
      <TableCell style={apiResult.erc20Synced?greenStyle:redStyle}>{apiResult.erc20Synced? <CheckIcon/> : <WarningIcon/>}</TableCell>
      <TableCell style={apiResult.masterCopiesSynced?greenStyle:redStyle}>{apiResult.masterCopiesSynced? <CheckIcon/> : <WarningIcon/> }</TableCell>
    </TableRow>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
       <Container component="main" maxWidth="lg">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>network</TableCell>
              <TableCell>currentBlockNumber</TableCell>
              <TableCell>erc20BlockNumber</TableCell>
              <TableCell>masterCopiesBlockNumber</TableCell>
              <TableCell>erc20Synced</TableCell>
              <TableCell>masterCopiesSynced</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(SERVICES).map(([key, value]) => (
              <ServiceStatus
                key={key}
                network={key}
                url={value}
              ></ServiceStatus>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
