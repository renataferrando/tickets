/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, FormControl, FormHelperText, Typography } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import FileInput from "../../common/file-input";

function FormikFile(props: any) {
  const [field, meta, action] = useField(props.name);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        return;
      }
      action.setValue(selectedFile);
    }
  };
  return (
    <FormControl fullWidth>
      <FileInput
        label="Upload File"
        onChange={handleFileChange}
        accept=".png,.jpg,.jpeg"
      />
      {field.value && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          <p>
            <strong>Selected File:</strong> {field.value.name}
          </p>
          <p>
            <strong>Size:</strong> {(field.value.size / 1024).toFixed(2)}
            KB
          </p>
          <CloseRoundedIcon
            className="text-gray-500 font-thin cursor-pointer self-start text-[14px]"
            onClick={() => action.setValue(null)}
          />
        </div>
      )}
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
    </FormControl>
  );
}

export default FormikFile;
