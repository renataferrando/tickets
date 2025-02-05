/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, FormControl, FormHelperText, Typography } from "@mui/material";
import { ErrorMessage, useField } from "formik";

import Select from "../../common/select/Select";

function FormikSelect(props: any) {
  const [field, meta, action] = useField(props.name);
  return (
    <FormControl fullWidth>
      <Select
        value={field.value}
        {...props}
        onChange={(e) => {
          action.setValue(e.target.value);
        }}
      />
      <ErrorMessage
        component={FormHelperText}
        name={props.name}
        render={(msg) => (
          <Typography
            id="data-field-error"
            component="span"
            className="px-2 py-1 font-sans text-xs font-medium text-red-500"
          >
            {msg}
          </Typography>
        )}
      />
    </FormControl>
  );
}

export default FormikSelect;
