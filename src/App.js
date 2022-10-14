import "./App.css";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ServiceProvider from "./components/ServiceProvider";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

const theme = createTheme();

function App() {
  const configServiceUrl = process.env.REACT_APP_CONFIG_SERVICE_URL;
  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
        }}
      >
        <ServiceProvider configServiceUrl={configServiceUrl}/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
