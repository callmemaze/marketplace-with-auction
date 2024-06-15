"use client";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCreateAuctionItemMutation } from "@/store/slices/auctionItemSlices";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { auctionSchema } from "@/validation/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const page = () => {
  const initialValues = {
    name: "",
    images: [],
    start_bid_date: "",
    price: "",
    details: "",
  };

  const [createAuctionItem] = useCreateAuctionItemMutation();
  const { toast } = useToast();
  const router = useRouter();
  const userProfile = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (!userProfile) {
      router.push("auth/login");
    }
  }, [userProfile]);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSelect = (e) => {
    initialValues.start_bid_date = e;
  };
  const { values, errors, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: auctionSchema,
      onSubmit: async (values, action) => {
        console.log(values);
        const formDatas = new FormData();
        formDatas.append("name", values.name);
        formDatas.append("start_bid_date", values.start_bid_date);
        formDatas.append("details", values.details);
        formDatas.append("price", values.price);
        formDatas.append("images", values.images);
        try {
          const response = await createAuctionItem(formDatas);
          if (response.data) {
            setErrorMessage("");
            action.resetForm();
            router.push("/auctions");
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
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        className="px-12 py-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="mb-8">
          <h5 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white font-Bricolage">
            Auction Details
          </h5>
          <p className="font-Bricolage">
            Please provide details of your for auction.
          </p>
        </div>
        <div className="">
          <Label htmlFor="title" className="font-Bricolage">
            Title
          </Label>
          <Input
            className="mt-2"
            id="name"
            placeholder="Title"
            type="name"
            name="name"
            value={values.name}
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
          <Label htmlFor="title" className="font-Bricolage">
            Start Bid Time
          </Label>
          <Select
            onValueChange={(e) => {
              setFieldValue("start_bid_date", e);
            }}
            name="start_bid_date"
          >
            <SelectTrigger id="start_bid_date" className="w-[250px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="1m"> 1 minute</SelectItem>
              <SelectItem value="1h">1 hour</SelectItem>
              <SelectItem value="1d">1 day</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="title" className="font-Bricolage">
            Details
          </Label>
          <Input
            className="mt-2"
            id="details"
            placeholder="Details"
            type="text"
            name="details"
            value={values.details}
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

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default page;
