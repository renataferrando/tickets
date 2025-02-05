/* eslint-disable */
import { FormHelperText, Typography } from "@mui/material";
// import FormLabel from "@mui/material";
import CustomDatePicker from "../../common/date-picker";
import { ErrorMessage, useField } from "formik";

function FormikDatePicker(props: any) {
  const [field] = useField(props.name);
  const handleDateChange = (date: any) => {
    const formattedDate = date ? date.toISOString() : null;
    field.onChange({ target: { name: props.name, value: formattedDate } });
  };

  return (
    <div className="w-full">
      <CustomDatePicker {...props} onChange={handleDateChange} />

      <ErrorMessage
        component={FormHelperText}
        name={props.name}
        render={(msg) => (
          <Typography
            id="data-field-error"
            component="span"
            className=" p-1 text-xs text-red-500 font-['Inter'] font-medium"
          >
            {msg}
          </Typography>
        )}
      />
    </div>
  );
}

export default FormikDatePicker;
