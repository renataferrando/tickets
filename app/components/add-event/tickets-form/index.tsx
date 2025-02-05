/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FormHelperText } from "@mui/material";
import { ErrorMessage, FieldArray, useField } from "formik";
import Button from "../../common/button";
import TicketSlice from "./ticket-slice";

const initialValues = {
  price: "",
  type: "",
  stock: "",
  description: "",
};

function TicketsForm(props: any) {
  const { isEdit, values } = props;
  const [, , actions] = useField("tickets");

  const shouldShowRemoveButton = (index: number, values: any) => {
    const isSingleLanguage = values.length === 1;
    const isValueEmpty =
      JSON.stringify(values[0]) === JSON.stringify(initialValues);
    return index === 0 && isEdit && isSingleLanguage && !isValueEmpty;
  };

  const formRender = () => {
    return (
      <FieldArray name="tickets">
        {({ push, remove, form }) => {
          const { languages: errorLang } = form.errors;
          return (
            <>
              {values.tickets.map((_exp: any, index: number) => (
                <div key={index}>
                  {(index > 0 ||
                    shouldShowRemoveButton(index, values.tickets)) && (
                    <Button
                      type="button"
                      className="text-primary text-xs self-start my-6"
                      onClick={() =>
                        shouldShowRemoveButton(index, values.tickets)
                          ? actions.setValue([initialValues])
                          : remove(index)
                      }
                      icon={<RemoveIcon className="text-base" />}
                      text="Remove tickets"
                    />
                  )}
                  <TicketSlice index={index} />
                </div>
              ))}
              {!Array.isArray(errorLang) && (
                <ErrorMessage
                  component={FormHelperText}
                  name="tickets"
                  render={(msg) => (
                    <p className=" p-1 text-xs text-red-500 font-['Inter'] font-medium ">
                      {msg}
                    </p>
                  )}
                />
              )}
              <Button
                type="button"
                className="text-primary text-xs self-start my-6"
                onClick={() => push(initialValues)}
                icon={<AddIcon className="text-base" />}
                text="Add new ticket type"
              />
            </>
          );
        }}
      </FieldArray>
    );
  };

  return <div className="flex flex-col px-6 w-full">{formRender()}</div>;
}

export default TicketsForm;
