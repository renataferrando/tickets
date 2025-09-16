/* eslint-disable */
import { FormHelperText, Typography } from "@mui/material";
// import FormLabel from "@mui/material";
// import CustomDatePicker from "../../common/date-picker";
import { ErrorMessage, useField } from "formik";
import { CustomDateTimePicker } from "../../common/date-picker";

function FormikDatePicker(props: any) {
  const [field] = useField(props.name);
  const handleDateChange = (date: any) => {
    console.log(date);
    const formattedDate = date ? date.toISOString() : null;
    field.onChange({ target: { name: props.name, value: formattedDate } });
  };

  return (
    <div className="w-full">
      <CustomDateTimePicker
        {...props}
        onChange={handleDateChange}
        value={field.value ? new Date(field.value) : null}
      />

      <ErrorMessage
        component={FormHelperText}
        name={props.name}
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
    </div>
  );
}

export default FormikDatePicker;
