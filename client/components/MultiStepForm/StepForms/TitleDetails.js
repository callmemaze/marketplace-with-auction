"use client";
import NavButton from "@/components/NavButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setCurrentStep, updateFormData } from "@/store/slices/stepSlices";
import { titleDetailsSchema } from "@/validation/schemas";
import { useFormik } from "formik";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

export default function TitleDetails() {
  const currentStep = useSelector((store) => store.stepSlice.currentStep);
  const formData = useSelector((store) => store.stepSlice.formData);

  async function processData(data) {
    // All Data is Valid
    //Collect all the data
    //Update Data in the Global state
    dispatch(updateFormData(data));
    //Make API Request to Save the Data also in the DB

    //Update the Current Step
    dispatch(setCurrentStep(currentStep + 1));
    // console.log(data);
  }
  const { values, errors, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        ...formData,
      },
      validationSchema: titleDetailsSchema,
      onSubmit: async (values, action) => {
        processData(values);
      },
    });
  const dispatch = useDispatch();
  return (
    <form
      className="px-12 py-4"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="mb-8">
        <h5 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white font-Bricolage">
          Title Details
        </h5>
        <p className="font-Bricolage">Please provide title of the details.</p>
      </div>
      <div className="">
        <Label htmlFor="title" className="font-Bricolage">
          Title
        </Label>
        <Input
          className="mt-2"
          id="title"
          placeholder="Title"
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          auto-capitalize="none"
          auto-correct="off"
        />
        <Label htmlFor="title" className="font-Bricolage">
          Price
        </Label>
        <Input
          className="mt-2"
          id="price"
          placeholder="Price"
          type="text"
          name="price"
          value={values.price}
          onChange={handleChange}
          auto-capitalize="none"
          auto-correct="off"
        />
        <Label htmlFor="images" className="font-Bricolage">
          Images
        </Label>
        <Input
          className="mt-2"
          id="images"
          type="file"
          name="images"
          onChange={(event) => {
            setFieldValue("images", event.currentTarget.files[0]);
          }}
          multiple={true}
        />
      </div>

      <NavButton />
    </form>
  );
}
