import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  LinearProgressProps,
} from "@mui/material";
import classNames from "classnames";


interface Props {
  className?: string
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box className="flex flex-col items-center w-full gap-2">
      <LinearProgress
        variant="determinate"
        {...props}
        sx={{
          width: "80%",
          backgroundColor: "#e2e8f0",
          height: "1px",
          "& .MuiLinearProgress-barColorPrimary": { backgroundColor: "#94a3b8" },
        }}
      />

      <Box sx={{ minWidth: 35 }}>
        <Typography className="text-slate-200">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const LinearLoading = ({ className }: Props) => {
  const [progress, setProgress] = React.useState(10);
    const classes = classNames(className, "w-full h-[100vh] flex items-center justify-center");

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className={classes}>
      <LinearProgressWithLabel value={progress} />
    </div>
  );
};

export default LinearLoading;
