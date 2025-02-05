/* eslint-disable */
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Typography,
} from "@mui/material";
import { ErrorMessage, useField } from "formik";
import TextArea from "../../common/text-area";

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

function FormikTextarea(props: Props) {
  const [field, meta, action] = useField(props.name);
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
      <TextArea
        {...props}
        id={props.name}
        value={field.value}
        onChange={(e) => action.setValue(e.target.value)}
      />

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
    </FormControl>
  );
}

export default FormikTextarea;
