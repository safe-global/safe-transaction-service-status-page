import { useState } from "react";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import useTheme from "src/hooks/useTheme";
import Header from "src/components/header/Header";
import ConfigServiceUrlSelector from "src/components/config-service-url-selector/ConfigServiceUrlSelector";
import ChainStatusTable from "src/components/chain-status-table/ChainStatusTable";

const VITE_CONFIG_SERVICE_URL = import.meta.env.VITE_CONFIG_SERVICE_URL;
const VITE_CLIENT_GATEWAY_URL = import.meta.env.VITE_CLIENT_GATEWAY_URL;
const VITE_SHOW_CONFIG_SERVICE_SELECTOR = import.meta.env
  .VITE_SHOW_CONFIG_SERVICE_SELECTOR;

function App() {
  const [configServiceUrl, setConfigServiceUrl] = useState<string>(
    VITE_CONFIG_SERVICE_URL || ""
  );

  const { theme, switchThemeMode, isDarkTheme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* App header */}
      <Header isDarkTheme={isDarkTheme} switchThemeMode={switchThemeMode} />

      <Container
        maxWidth="lg"
        component="main"
        sx={{ marginBottom: "36px", marginTop: "42px" }}
      >
        {/* Config service selector */}
        {showConfigServiceSelector && (
          <ConfigServiceUrlSelector
            configServiceUrl={configServiceUrl}
            setConfigServiceUrl={setConfigServiceUrl}
          />
        )}

        {/* Chain status table */}
        <ChainStatusTable
          configServiceUrl={configServiceUrl}
          clientGatewayUrl={VITE_CLIENT_GATEWAY_URL}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;

const showConfigServiceSelector = VITE_SHOW_CONFIG_SERVICE_SELECTOR === "true";
