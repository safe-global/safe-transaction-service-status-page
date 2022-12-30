import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

const REFRESH_TIME = 1_000; // 1 sec

function TimeAgoLabel({ blockTimestamp }: { blockTimestamp: number }) {
  const [now, setNow] = useState(Date.now());

  // refresh time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, REFRESH_TIME);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const timeAgoInMillins = now - blockTimestamp;

  const timeAgoInSeconds = timeAgoInMillins / 1_000;

  // label in seconds
  if (timeAgoInSeconds < 60) {
    return (
      <Typography variant="caption" color="success.main">
        {~~timeAgoInSeconds} secs ago
      </Typography>
    );
  }

  const timeAgoInMinutes = timeAgoInSeconds / 60;

  // label in minutes
  if (timeAgoInMinutes < 60) {
    return (
      <Typography variant="caption" color="warning.light">
        {~~timeAgoInMinutes} mins ago
      </Typography>
    );
  }

  const timeAgoInHours = timeAgoInMinutes / 60;

  // label in hours
  if (timeAgoInHours < 24) {
    return (
      <Typography variant="caption" color="warning.main">
        {~~timeAgoInHours} hours ago
      </Typography>
    );
  }

  const timeAgoInDays = timeAgoInHours / 24;

  // label in days
  if (timeAgoInDays < 30) {
    return (
      <Typography variant="caption" color="warning.dark">
        {~~timeAgoInDays} days ago
      </Typography>
    );
  }

  const timeAgoInMonths = timeAgoInDays / 30;

  // label in months as fallback
  return (
    <Typography variant="caption" color="error">
      {~~timeAgoInMonths} months ago
    </Typography>
  );
}

export default TimeAgoLabel;
