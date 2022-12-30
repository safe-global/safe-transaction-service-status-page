import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

type SyncedLabelPros = {
  isSynced?: boolean;
  isLoading: boolean;
  currentBlockNumber?: number;
  lastBlockNumber?: number;
};

const WARNING_BLOCK_THRESHOLD = 10;
const ERROR_BLOCK_THRESHOLD = 50;

function SyncedLabel({
  isLoading,
  isSynced,
  currentBlockNumber,
  lastBlockNumber,
}: SyncedLabelPros) {
  const isReady = !!currentBlockNumber && !!lastBlockNumber;
  const blocksBehind = isReady ? currentBlockNumber - lastBlockNumber : "?";
  const formatedBlocksBehind = Intl.NumberFormat().format(Number(blocksBehind));
  const isFullySynced = blocksBehind === 0;

  return (
    <Stack
      direction="column"
      alignItems="center"
      alignContent="center"
      justifyContent="center"
      spacing={0.25}
    >
      {isLoading && !currentBlockNumber ? (
        <>
          {/* Loading state  */}
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={"100px"} />
        </>
      ) : (
        <>
          {/* Icon synced indicator */}
          {isSynced ? (
            <>
              {blocksBehind < WARNING_BLOCK_THRESHOLD ? (
                <CheckCircleRoundedIcon color={"success"} />
              ) : (
                <WarningRoundedIcon color={"warning"} />
              )}
            </>
          ) : (
            <CancelRoundedIcon color="error" />
          )}
          {
            <>
              {/* Blocks behind label */}
              {isFullySynced ? (
                <Typography variant="caption" color="success.main">
                  Synchronized
                </Typography>
              ) : (
                <Typography
                  variant="caption"
                  color={getLabelColor(Number(blocksBehind), isSynced || false)}
                >
                  {`${formatedBlocksBehind} Block${
                    blocksBehind > 1 ? "s" : ""
                  } behind`}
                </Typography>
              )}
            </>
          }
        </>
      )}
    </Stack>
  );
}

export default SyncedLabel;

// based on Blocks behind we change the label color
function getLabelColor(blocksBehind: number, isSynced: boolean): string {
  if (!isSynced) {
    return "error.main";
  }

  if (blocksBehind < WARNING_BLOCK_THRESHOLD) {
    return "success.light";
  }

  if (blocksBehind < WARNING_BLOCK_THRESHOLD + 10) {
    return "warning.light";
  }

  if (blocksBehind < ERROR_BLOCK_THRESHOLD) {
    return "warning.main";
  }

  return "warning.dark";
}
