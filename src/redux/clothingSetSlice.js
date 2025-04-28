// src/redux/clothingSetSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { formatDuration } from "../utils/formatDuration";
const initialState = {
  currentSet: {
    id: null,
    shirt: null,
    pants: null,
    shoes: null,
    createdOn: null,
  },
  savedSets: [],
};

const clothingSetSlice = createSlice({
  name: "clothingSet",
  initialState,
  reducers: {
    addItemToSet(state, action) {
      const { item } = action.payload;
      state.currentSet[item.type] = item;
    },
    saveCurrentSet(state) {
      const { shirt, pants, shoes, createdOn } = state.currentSet;
      if (shirt && pants && shoes) {
        const now = Date.now();
        const durationMs = now - createdOn;
        const duration = formatDuration(durationMs);
        state.savedSets.push({ shirt, pants, shoes, duration });
        state.currentSet = {
          id: null,
          shirt: null,
          pants: null,
          shoes: null,
          createdOn: null,
        };
        localStorage.setItem("savedSets", JSON.stringify(state.savedSets));
      }
    },
    startNewSet(state) {
      state.currentSet = {
        id: Date.now(),
        shirt: null,
        pants: null,
        shoes: null,
        createdOn: Date.now(),
      };
    },
    resetCurrentSet(state) {
      state.currentSet = {
        id: null,
        shirt: null,
        pants: null,
        shoes: null,
        createdOn: null,
      };
    },
    getCurrentSetFromLocalStorage(state) {
      const savedSetAsString = localStorage.getItem("savedSets");
      if (savedSetAsString) {
        state.savedSets = JSON.parse(savedSetAsString);
      }
    },
    removeSetFromList(state, action) {
      const { setId } = action.payload;
      const savedSetAsString = localStorage.getItem("savedSets");
      let savedSets = JSON.parse(savedSetAsString) || [];

      const indexToRemove = savedSets.findIndex((set) => set.id === setId);

      if (indexToRemove !== -1) {
        savedSets.splice(indexToRemove, 1);
      }

      state.savedSets = savedSets;
      localStorage.setItem("savedSets", JSON.stringify(state.savedSets));
    },
  },
});

export const {
  addItemToSet,
  saveCurrentSet,
  resetCurrentSet,
  getCurrentSetFromLocalStorage,
  startNewSet,
  removeSetFromList,
} = clothingSetSlice.actions;

export default clothingSetSlice.reducer;
