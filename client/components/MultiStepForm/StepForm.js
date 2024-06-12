"use client";

import { useSelector } from "react-redux";
import TitleDetails from "./StepForms/TitleDetails";
import ItemDetails from "./StepForms/ItemDetails";

export default function StepForm() {
  const currentStep = useSelector((store) => store.stepSlice.currentStep);
  function renderFormByStep(step) {
    if (step === 1) {
      return <TitleDetails />;
    } else if (step === 2) {
      return <ItemDetails />;
    }
  }
  return <>{renderFormByStep(currentStep)}</>;
}
