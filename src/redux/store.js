import { configureStore } from "@reduxjs/toolkit";
import clothingSetReducer from "./clothingSetSlice";
import recommendationsReducer from "./recommendationsSlice";

export const store = configureStore({
  reducer: {
    clothingSet: clothingSetReducer,
    recommendations: recommendationsReducer,
  },
});
