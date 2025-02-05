import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0097b8" />
            <stop offset="100%" stopColor="#00b8b9" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        size={40}
        thickness={2}
        sx={{
          "svg circle": {
            stroke: "url(#my_gradient)",
          },
        }}
      />
    </Box>
  );
};

export default LoadingSpinner;