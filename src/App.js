import './App.css';

import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ServiceStatus from './components/ServiceStatus'
import ServiceProvider from './components/ServiceProvider';


const theme = createTheme();



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
            <ServiceProvider/>
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
