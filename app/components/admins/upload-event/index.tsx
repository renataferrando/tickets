/* eslint-disable */
// @ts-nocheck 
"use client";

import { useState } from "react";
import { Box, Divider } from "@mui/material";
import AutocompleteSearch from "../../add-event/search-location";
import { useGetLocationQuery } from "@/services/getCities";
import Button from "../../common/button";
import { eventInitialValues } from "./initialValues";
import { Form, Formik } from "formik";
import FormikInput from "../../formik/formik-input";
import FormikSelect from "../../formik/formik-select";
import FormikDatePicker from "../../formik/formik-datepicker";
import FormikTextarea from "../../formik/formik-textarea";
import FormikFile from "../../formik/formik-file";
import { useAddNewEventMutation } from "@/services/eventService.ts";
import { redirect } from "next/navigation";
import LoadingSpinner from "../../common/spinner";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { ProfileType } from "@/app/types/profile";
import TicketsForm from "../../add-event/tickets-form";

const CATEGORY_LABELS = [
  { value: "LIVE_MUSIC", label: "Live Music" },
  { value: "PARTY", label: "Party" },
  { value: "SPORTS", label: "Sports" },
  { value: "ENTERTAINMENT", label: "Entertainment" },
  { value: "EDUCATION", label: "Education" },
  { value: "HEALTH", label: "Health" },
];

export default function UploadEventForm({ user }: ProfileType) {
  const [locationValue, setLocationValue] = useState(null);
  const [addEvent, { isLoading }] = useAddNewEventMutation();
  const [showTicketsType, setShowTicketsType] = useState(false);

  const { data: location } = useGetLocationQuery(
    { namePrefix: locationValue },
    { skip: !locationValue, refetchOnMountOrArgChange: true }
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
      ...values,
      imageUrl: imageUrl,
      organizerId: user.id,
      tickets: {
        create: values.tickets,
      },
    };

    try {
      await addEvent(payload).unwrap();
      redirect("/my-events");
    } catch (err) {
      console.error("Failed to save the event: ", err);
    }
  };


  return (
    <>
      {!isLoading ? (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          initialValues={eventInitialValues}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="w-full px-10 flex flex-col gap-2 max-h-[650px] overflow-auto">
              <div>
                <FormikInput
                  id="event-name"
                  name="name"
                  label="Event name"
                  required
                />
              </div>
              <Box
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setShowTicketsType(!showTicketsType)}
              >
                <p className="text-sm font-medium text-gray-700">Tickets</p>
                {!showTicketsType ? (
                  <KeyboardArrowDownRounded className="text-[18px] text-gray-700" />
                ) : (
                  <KeyboardArrowUpRounded className="text-[18px] text-gray-700" />
                )}
              </Box>

              <div
                className={`transition-height duration-300 ease-in-out ${
                  showTicketsType
                    ? "max-h-[900px] opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <TicketsForm values={values} />
              </div>

              <Divider className="mt-2" />
              <div>
                <FormikSelect
                  label="Event category"
                  id="event-categories"
                  name="category"
                  options={CATEGORY_LABELS}
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
                fullRounded
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
