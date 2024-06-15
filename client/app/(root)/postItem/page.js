"use client";
import StepForm from "@/components/MultiStepForm/StepForm";
import Steps from "@/components/MultiStepForm/Steps";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function PostItem() {
  const steps = [
    {
      number: 1,
      title: "Tile Details",
    },
    {
      number: 2,
      title: "Item Details",
    },
  ];
  return (
    <div className="bg-blue-50 min-h-screen p-4">
      <div className="mx-auto w-full max-w-5xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-4 md:p-6 dark:bg-gray-800 dark:border-gray-700 grid grid-cols-12 gap-4 min-h-screen">
        {/* Steps */}
        <Steps steps={steps} />
        {/* Form */}
        <div className="rounded-lg col-span-full md:col-span-8">
          <StepForm />
        </div>
      </div>
    </div>
  );
}
