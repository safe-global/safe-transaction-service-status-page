import { ReactNode } from "react";
import styled from "@emotion/styled";
import { Theme } from "@mui/material";

import chain from "src/models/chain";
import { DARK_THEME } from "src/theme/theme";

type ChainNameLabelProps = {
  chainTheme: chain["theme"];
  children?: ReactNode;
};

function ChainNameLabel({ chainTheme, children }: ChainNameLabelProps) {
  return (
    <Label
      backgroundColor={chainTheme.backgroundColor}
      textColor={chainTheme.textColor}
    >
      {children}
    </Label>
  );
}

export default ChainNameLabel;

const Label = styled("span")<{
  backgroundColor: string;
  textColor: string;
  theme?: Theme;
}>`
  margin-right: 8px;
  border-radius: 4px;
  padding: 4px 12px;

  border: 1px solid
    ${(props) => (props.theme.palette.mode === DARK_THEME ? "#fff" : "#000000")};

  white-space: nowrap;

  background-color: ${(props) => props.backgroundColor};

  color: ${(props) => props.textColor};
`;
