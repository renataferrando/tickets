/* eslint-disable */
 // @ts-nocheck 
import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

interface CustomDatePickerProps {
  label?: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  disabled?: boolean;
  muiDateStyle?: any;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  disabled = false,
  muiDateStyle = {
    width: "100%",
    backgroundColor: "#FFF",
    "& .MuiInputBase-input": {
      padding: "10px 12px",
      fontFamily: "__NeoSansPro_b34e90",
      fontSize: "12px",
    },
  },
  ...r
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {label && <p className="text-sm font-medium text-gray-700">{label}</p>}
      <DatePicker
        {...r}
        value={value}
        onChange={onChange}
        disabled={disabled}
        sx={muiDateStyle}
        slots={(params: TextFieldProps) => (
          <TextField {...params} error={!!error} helperText={error} />
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
