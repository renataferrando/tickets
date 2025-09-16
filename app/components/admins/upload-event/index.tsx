/* eslint-disable */
// @ts-nocheck
"use client";

import { useState, useMemo } from "react";
import { Box, Divider } from "@mui/material";
import AutocompleteSearch from "../../add-event/search-location";
import { useGetLocationQuery } from "@/services/getCities";
import Button from "../../common/button";
import { eventInitialValues } from "./initialValues";
import { schema } from "./schema";
import { Form, Formik } from "formik";
import FormikInput from "../../formik/formik-input";
import FormikSelect from "../../formik/formik-select";
import FormikDatePicker from "../../formik/formik-datepicker";
import FormikTextarea from "../../formik/formik-textarea";
import FormikFile from "../../formik/formik-file";
import { useAddNewEventMutation } from "@/services/eventService";
import { redirect } from "next/navigation";
import LoadingSpinner from "../../common/spinner";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import TicketsForm from "../../add-event/tickets-form";
import SimpleModal from "../../common/simple-modal";
import { useGetCategoriesQuery } from "@/services/categoryService";
import { Button as ButtonUI } from "../../ui/button";
import { toast } from "sonner";

export default function UploadEventForm({ user }: any) {
  const [locationValue, setLocationValue] = useState(null);
  const [addEvent, { isLoading }] = useAddNewEventMutation();
  const [showTicketsType, setShowTicketsType] = useState(false);
  const [ticketsOpen, setTicketsOpen] = useState(false);

  const { data: location } = useGetLocationQuery(
    { namePrefix: locationValue },
    { skip: !locationValue, refetchOnMountOrArgChange: true }
  );
  const { data: categories } = useGetCategoriesQuery(null);

  const categoryOptions = useMemo(
    () => (categories ?? []).map((c) => ({ value: c.id, label: c.name })),
    [categories]
  );

  const handleImageUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_UPLOAD_PRESET || "ml_default"
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (values: any) => {
    const imageUrl = await handleImageUpload(values.imageUrl);
    const payload = {
      name: values.name,
      date: values.date,
      location: values.location,
      description: values.description,
      imageUrl: imageUrl,
      organizerId: user.id,
      categoryId: values.categoryId,
      tickets: values.tickets,
    };

    try {
      await addEvent(payload).unwrap();
      toast.success("Event created successfully");
      redirect("/events");
    } catch (err) {
      console.error("Failed to save the event: ", err);
      toast.error("Failed to create event");
    }
  };

  return (
    <>
      {!isLoading ? (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={eventInitialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors }) => (
            <Form className="w-full px-10 flex flex-col gap-2 max-h-[650px] overflow-auto">
              <div>
                <FormikInput id="event-name" name="name" label="Event name" />
              </div>
              <ButtonUI
                type="button"
                onClick={() => setTicketsOpen(true)}
                variant="outline"
              >
                <p className="text-sm font-medium text-gray-700">
                  Select tickets
                </p>
              </ButtonUI>
              {errors?.tickets?.length > 0 && (
                <p className="p-1 font-sans text-xs font-medium text-red-500">
                  Complete all fields
                </p>
              )}

              <SimpleModal
                open={ticketsOpen}
                onClose={() => setTicketsOpen(false)}
              >
                <div className="p-6 max-h-[80vh] overflow-auto">
                  <h3 className="text-lg font-semibold mb-4">Tickets</h3>
                  <TicketsForm values={values} />
                </div>
                <div className="flex gap-2 p-4 justify-end">
                  <Button
                    type="button"
                    onClick={() => setTicketsOpen(false)}
                    sm
                    primary
                    roundedNormal
                    text="Save"
                  />

                  <Button
                    type="button"
                    sm
                    onClick={() => {
                      setFieldValue("tickets", [
                        { price: "", type: "", stock: "", description: "" },
                      ]);
                      setTicketsOpen(false);
                    }}
                    secondary
                    className="w-auto"
                    roundedNormal
                    text="Discard"
                  />
                </div>
              </SimpleModal>

              <Divider className="mt-2" />
              <div>
                <FormikSelect
                  label="Event category"
                  id="event-categories"
                  name="categoryId"
                  options={categoryOptions}
                />
              </div>
              <div>
                <FormikDatePicker name="date" disablePast label="Event date" />
              </div>
              <div>
                <FormikTextarea
                  className="max-h-[80px] text-sm"
                  id="description"
                  name="description"
                  label="Event description"
                  required
                />
              </div>
              <div>
                <AutocompleteSearch
                  name="location"
                  options={location?.data}
                  handleName={setLocationValue}
                />
              </div>
              <div className="w-[40%]">
                <p className="text-sm font-medium text-gray-700">Image</p>
                <div className="py-2">
                  <FormikFile name="imageUrl" />
                </div>
              </div>
              <Divider className="mt-2 mb-4" />
              <Button
                type="submit"
                text="Create event"
                primary
                sm
                roundedNormal
              />
            </Form>
          )}
        </Formik>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
