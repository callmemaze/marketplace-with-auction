"use client";
import NavButton from "@/components/NavButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { setCurrentStep, updateFormData } from "@/store/slices/stepSlices";
import { useFormik } from "formik";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { itemsDetailsSchema } from "@/validation/schemas";
import { useCreateItemMutation } from "@/store/slices/itemSlices";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function ItemDetails() {
  const currentStep = useSelector((store) => store.stepSlice.currentStep);
  const formData = useSelector((store) => store.stepSlice.formData);
  const [createItem] = useCreateItemMutation();
  const { toast } = useToast();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      ...formData,
    },
    validationSchema: itemsDetailsSchema,
    onSubmit: async (values, action) => {
      console.log(values.title);
      const formDatas = new FormData();
      formDatas.append("title", values.title);
      formDatas.append("condition", values.condition);
      formDatas.append("location", values.location);
      formDatas.append("price", values.price);
      formDatas.append("description", values.description);
      formDatas.append("images", values.images);
      try {
        const response = await createItem(formDatas);
        if (response.data) {
          setErrorMessage("");
          action.resetForm();
          router.push("/marketplaces");
        }
        if (response.error) {
          setErrorMessage(response.error.data.message);
          console.log(response.error.data.message);
          toast({
            title: "Oops Error",
            variant: "destructive",
            description: response.error.data.message,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  async function processData(data) {
    console.log(data);
  }

  return (
    <form
      className="px-12 py-4"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="mb-8">
        <h5 className="text-xl md:text-3xl font-bold font-Bricolage text-gray-900 dark:text-white">
          Items Details
        </h5>
        <p className="font-Bricolage">
          Please provide your details about the items.
        </p>
      </div>
      <div className="">
        <Label htmlFor="condition" className="font-Bricolage">
          Condition
        </Label>
        <Input
          className="mt-2"
          id="condition"
          type="text"
          name="condition"
          value={values.condition}
          onChange={handleChange}
          auto-capitalize="none"
          auto-correct="off"
        />
        <Label htmlFor="location" className="font-Bricolage">
          Location
        </Label>
        <Input
          className="mt-2"
          id="location"
          type="text"
          name="location"
          value={values.location}
          onChange={handleChange}
          auto-capitalize="none"
          auto-correct="off"
        />
        <Label htmlFor="description" className="font-Bricolage">
          Description
        </Label>
        <Textarea
          className="mt-2"
          placeholder="Type your item description."
          id="description"
          type="text"
          name="description"
          value={values.description}
          onChange={handleChange}
        />
      </div>

      <NavButton />
    </form>
  );
}
