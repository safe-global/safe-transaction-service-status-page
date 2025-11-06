import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DarkThemeIcon from "@mui/icons-material/Brightness4";
import LightThemeIcon from "@mui/icons-material/Brightness7";
import styled from "@emotion/styled";

import safeLogo from "src/assets/safe-logo.svg";

type HeaderProps = {
  switchThemeMode: () => void;
  isDarkTheme: boolean;
};

function Header({ switchThemeMode, isDarkTheme }: HeaderProps) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* App Logo */}
          <AppLogoHeader id="app-logo-header" src={safeLogo} alt="app logo" />

          {/* Navigation links */}
          <Box
            flexGrow={1}
            display="flex"
            component="nav"
            justifyContent="flex-end"
          >
            <NavList>
              {/* Github Link */}
              <NavListItem>
                <Link
                  href="https://github.com/safe-global/"
                  color="inherit"
                  underline="hover"
                  target="_blank"
                >
                  <Typography>Github</Typography>
                </Link>
              </NavListItem>

              {/* Help Docs Link */}
              <NavListItem>
                <Link
                  href="https://help.safe.global/"
                  color="inherit"
                  underline="hover"
                  target="_blank"
                >
                  <Typography>Help Docs</Typography>
                </Link>
              </NavListItem>

              {/* Developes Docs Link */}
              <NavListItem>
                <Link
                  href="https://docs.safe.global/"
                  color="inherit"
                  underline="hover"
                  target="_blank"
                >
                  <Typography>Dev Docs</Typography>
                </Link>
              </NavListItem>

              {/* Support tickets Link */}
              <NavListItem>
                <Link
                  href="https://github.com/5afe/safe-support/issues"
                  color="inherit"
                  underline="hover"
                >
                  <Typography>Support tickets</Typography>
                </Link>
              </NavListItem>
            </NavList>
          </Box>

          {/* Switch Theme mode button */}
          <Tooltip title="Switch Theme mode">
            <IconButton
              sx={{ marginLeft: 2 }}
              size="large"
              color="inherit"
              aria-label="switch theme mode"
              edge="end"
              onClick={switchThemeMode}
            >
              {isDarkTheme ? <LightThemeIcon /> : <DarkThemeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

const AppLogoHeader = styled("img")`
  height: 25px;
  pointer-events: none;
  filter: invert(1) brightness(1);
`;

const NavList = styled("ul")`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavListItem = styled("li")`
  margin-left: 16px;
`;
