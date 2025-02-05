/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react/jsx-no-useless-fragment */
"use client";
import { Autocomplete, TextField } from "@mui/material";
import debounce from "just-debounce-it";
import React, { useCallback } from "react";
import { useField } from "formik";

const AutocompleteSearch = ({ handleName, options, ...props }: any) => {
  const handleOnType = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleName(e.target.value);
  };
  const [, , action] = useField("location");
  const debounceOnChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => handleOnType(e), 1000),
    []
  );
  const customCompanyOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceOnChange(e);
  };

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium text-gray-700">Search location</p>
      <Autocomplete
        {...props}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        onChange={(_e, value) => action.setValue(value)}
        options={
          options?.map(
            (option: any) => option.city + "," + " " + option.country
          ) || []
        }
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              "& .MuiInputBase-root": {
                padding: "0 4px",
                backgroundColor: "#FFF",
              },
            }}
            onChange={customCompanyOnChange}
            slotProps={{
              input: {
                ...params.InputProps,
                type: "search",
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default AutocompleteSearch;
