/* eslint-disable no-shadow */
import * as Yup from "yup";

export const schema = Yup.object().shape({
  name: Yup.string().required("Enter name"),
  tickets: Yup.array()
    .of(
      Yup.object().shape({
        price: Yup.number().required("Enter price"),
        type: Yup.string().required("Select type"),
        stock: Yup.number().required("Enter amount of tickets"),
        description: Yup.string().required("Add description"),
      })
    )
    .required("Add at least one type of tickets"),
  date: Yup.date().required("Select event date"),
  imageUrl: Yup.string().required("Upload picture"),
  description: Yup.string().required("Add some description"),
  location: Yup.string().required("Enter event location"),
  categoryId: Yup.number()
    .typeError("Select an event category")
    .required("Select an event category"),
});
