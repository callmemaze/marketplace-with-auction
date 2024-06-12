const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentStep: 1,
  formData: {
    title: "",
    images: [],
    condition: "",
    price: "",
    description: "",
    location: "",
  },
};
const stepSlices = createSlice({
  name: "stepSlice",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
  },
});
export const { setCurrentStep, updateFormData } = stepSlices.actions;
export default stepSlices.reducer;
