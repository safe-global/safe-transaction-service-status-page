import { useState } from "react";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import useTheme from "src/hooks/useTheme";
import Header from "src/components/header/Header";
import ConfigServiceUrlSelector from "src/components/config-service-url-selector/ConfigServiceUrlSelector";
import ChainStatusTable from "src/components/chain-status-table/ChainStatusTable";
import { CONFIG_SERVICE_PRODUCTION_OPTION } from "src/constants/configService";

// production config service url as initial value
const prodUrl = CONFIG_SERVICE_PRODUCTION_OPTION.value;

function App() {
  const [configServiceUrl, setConfigServiceUrl] = useState<string>(prodUrl);

  const { theme, switchThemeMode, isDarkTheme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* App header */}
      <Header isDarkTheme={isDarkTheme} switchThemeMode={switchThemeMode} />

      <Container maxWidth="lg" component="main" sx={{ marginBottom: "32px" }}>
        {/* Config service selector */}
        <ConfigServiceUrlSelector
          configServiceUrl={configServiceUrl}
          setConfigServiceUrl={setConfigServiceUrl}
        />

        {/* Chain status table */}
        <ChainStatusTable configServiceUrl={configServiceUrl} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
