import { ReactNode } from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

type LoaderProps = {
  isLoading?: boolean;
  loadingText?: ReactNode;
  minHeight?: number;
};

function Loader({ isLoading, loadingText, minHeight }: LoaderProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      component="div"
      minHeight={minHeight}
    >
      <CircularProgress />
      <div>{loadingText}</div>
    </Stack>
  );
}

export default Loader;
