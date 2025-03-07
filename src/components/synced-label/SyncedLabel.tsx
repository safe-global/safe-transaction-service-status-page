import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

type SyncedLabelPros = {
  isSynced?: boolean;
  isLoading: boolean;
  currentBlockNumber?: number;
  lastBlockNumber?: number;
};

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
            <CheckCircleRoundedIcon color={"success"} />
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
                  color={isSynced ? "success.light" : "error.main"}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {`${formatedBlocksBehind} Block${Number(blocksBehind) > 1 ? "s" : ""} behind`}
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
