import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Link from "@mui/material/Link";
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded";
import styled from "@emotion/styled";
import { Theme } from "@mui/material";

import chain from "src/models/chain";
import { DARK_THEME } from "src/theme/theme";
import getBlockExplorerHref from "src/utils/getBlockExplorerHref";
import TimeAgoLabel from "src/components/time-ago-label/TimeAgoLabel";
import { Block } from "viem";

type BlockLabelProps = {
  blockNumber?: number;
  blockExplorerUriTemplate: chain["blockExplorerUriTemplate"];
  getBlock: (blockNumber: number) => Promise<Block>;
};

function BlockLabel({
  blockNumber,
  blockExplorerUriTemplate,
  getBlock,
}: BlockLabelProps) {
  const [blockTimestamp, setBlockTimestamp] = useState<number>();

  // we build the block href from the tx template
  const blockExplorerHref = getBlockExplorerHref(
    blockExplorerUriTemplate.txHash,
    blockNumber,
  );

  // fetch block timestamp from getBlock
  useEffect(() => {
    if (blockNumber) {
      getBlock(blockNumber)
        .then(({ timestamp }) => {
          const blockTimestamp = Number(timestamp) * 1_000; // in milliseconds
          setBlockTimestamp(blockTimestamp);
        })
        .catch((error) => {
          // on Rpc error (sometimes chains like Avalanche or EWC fails and returns empty Rpc responses)
          console.log(`Rpc fail on fetch ${blockNumber} block: `, error);
          setBlockTimestamp(undefined);
        });
    }

    return () => {
      setBlockTimestamp(undefined);
    };
  }, [blockNumber, getBlock]);

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      component="span"
      spacing={0.3}
    >
      {blockNumber ? (
        <>
          <Tooltip title={"view block details on the Block Explorer"}>
            <BlockLink
              href={blockExplorerHref}
              target="_blank"
              rel="noopener"
              underline="hover"
              color="inherit"
              fontSize="small"
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                component="span"
                spacing={0.5}
              >
                <ViewInArRoundedIcon fontSize="small" />

                {/* Block number formatted */}
                <span>{Intl.NumberFormat().format(Number(blockNumber))}</span>
              </Stack>
            </BlockLink>
          </Tooltip>

          {/* Time ago label */}
          {blockTimestamp ? (
            <TimeAgoLabel blockTimestamp={blockTimestamp} />
          ) : (
            <Skeleton variant="text" width="60px" />
          )}
        </>
      ) : (
        <>
          {/* Loading state label */}
          <Skeleton variant="text" sx={{ fontSize: "20px" }} width="100px" />
          <Skeleton variant="text" width="60px" />
        </>
      )}
    </Stack>
  );
}

export default BlockLabel;

const BlockLink = styled(Link)<{
  theme?: Theme;
}>`
  border: 1px solid
    ${(props) => (props.theme.palette.mode === DARK_THEME ? "#fff" : "#000000")};
  border-radius: 4px;
  padding: 4px 6px 4px 4px;
  background-color: ${(props) =>
    props.theme.palette.mode === DARK_THEME ? "#454545" : "#e8e8e8"};
`;
