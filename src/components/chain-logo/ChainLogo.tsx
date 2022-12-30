import { useState } from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import styled from "@emotion/styled";

type ChainLogoProps = {
  chainName: string;
  logoUri: string;
};

function ChainLogo({ chainName, logoUri }: ChainLogoProps) {
  const [showChainLogo, setShowChainLogo] = useState(false);

  const onLoadLogoImg = () => setShowChainLogo(true);

  return (
    <Container direction="row" alignItems="center" justifyContent="center">
      <PlaceholderImage
        showChainLogo={showChainLogo}
        variant="circular"
        width={24}
        height={24}
      />
      <Image
        src={logoUri}
        alt={`${chainName} logo image`}
        onLoad={onLoadLogoImg}
        showChainLogo={showChainLogo}
      />
    </Container>
  );
}

export default ChainLogo;

const Container = styled(Stack)`
  position: relative;
  height: 24px;
`;

const PlaceholderImage = styled(Skeleton, {
  // removed showChainLogo custom prop from the DOM
  shouldForwardProp: (prop: string) => prop !== "showChainLogo",
})<{ showChainLogo: boolean }>`
  position: absolute;
  height: 24px;

  visibility: ${(props) => (props.showChainLogo ? "hidden" : "visible")};
`;

const Image = styled("img", {
  // removed showChainLogo custom prop from the DOM
  shouldForwardProp: (prop: string) => prop !== "showChainLogo",
})<{ showChainLogo: boolean }>`
  height: 24px;
  border-radius: 4px;

  visibility: ${(props) => (props.showChainLogo ? "visible" : "hidden")};
  transition: visibility 0.5s;
`;
