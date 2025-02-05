/* eslint-disable */
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field } from "formik";
import Input from "../../common/input";
interface Props {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  inputProps?: any;
  helperText?: string;
  noErrorMsg?: boolean;
  [x: string]: any;
}

function FormikInput(props: Props) {
  const {
    name,
    type = "text",
    label = "",
    placeholder = "",
    required = false,
    multiline = false,
    rows = 4,
    disabled = false,
    inputProps = {},
    helperText = "",
    noErrorMsg = false,
    ...r
  } = props;
 
  return (
    <FormControl fullWidth>
      <Field
        id={name}
        label={label}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        multiline={multiline}
        rows={rows}
        as={Input}
        disabled={disabled}
        inputProps={inputProps}
        helperText={helperText}
        {...r}
      />
      {!noErrorMsg && (
        <ErrorMessage
          component={FormHelperText}
          name={name}
          render={(msg) => (
            <Typography
              id="data-field-error"
              component="span"
              className="p-1 font-sans text-xs font-medium text-red-500"
            >
              {msg}
            </Typography>
          )}
        />
      )}
    </FormControl>
  );
}

export default FormikInput;
