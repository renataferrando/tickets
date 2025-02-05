/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
import FormikSelect from "../../../formik/formik-select";
import FormikInput from "../../../formik/formik-input";

const ticketTypes = [
  {
    label: "Vip",
    value: "vip",
  },
  {
    label: "General",
    value: "general",
  },
];

function TicketSlice({ index }: any) {
  return (
    <div className="grid grid-rows-[50%_50%] gap-2 mt-4">
      <div className="flex items-center gap-2">
        <FormikSelect
          label="Ticket type"
          className="py-[4px] px- text-xs"
          id="ticket-type"
          options={ticketTypes}
          name={`tickets.${index}.type`}
        />
        <FormikInput
          id="ticket price"
          className="py-[4px] px- text-xs"
          name={`tickets.${index}.price`}
          label="Ticket price"
          type="number"
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <FormikInput
          id="ticket stock"
          className="py-[4px] px- text-xs"
          name={`tickets.${index}.stock`}
          label="Ticket stock"
          type="number"
          required
        />
        <FormikInput
          id="ticket description"
          className="py-[4px] px- text-xs"
          name={`tickets.${index}.description`}
          label="Ticket description"
          required
        />
      </div>
    </div>
  );
}

export default TicketSlice;
