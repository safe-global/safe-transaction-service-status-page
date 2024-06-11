import { useState } from "react";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import useTheme from "src/hooks/useTheme";
import Header from "src/components/header/Header";
import ConfigServiceUrlSelector from "src/components/config-service-url-selector/ConfigServiceUrlSelector";
import ChainStatusTable from "src/components/chain-status-table/ChainStatusTable";

const { REACT_APP_CONFIG_SERVICE_URL, REACT_APP_SHOW_CONFIG_SERVICE_SELECTOR } =
  process.env;

function App() {
  const [configServiceUrl, setConfigServiceUrl] = useState<string>(
    REACT_APP_CONFIG_SERVICE_URL || "",
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
        <ChainStatusTable configServiceUrl={configServiceUrl} />
      </Container>
    </ThemeProvider>
  );
}

export default App;

const showConfigServiceSelector =
  REACT_APP_SHOW_CONFIG_SERVICE_SELECTOR === "true";
