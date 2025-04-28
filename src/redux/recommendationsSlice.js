import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendedSizes: [],
  recommendedColors: [],
};

const recommendationsSlice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {
    setRecommendations(state, action) {
      state.recommendedSizes = action.payload.recommendedSizes || [];
      state.recommendedColors = action.payload.recommendedColors || [];
    },
    resetRecommendations(state) {
      state.recommendedSizes = [];
      state.recommendedColors = [];
    },
  },
});

export const { setRecommendations, resetRecommendations } =
  recommendationsSlice.actions;
export default recommendationsSlice.reducer;
