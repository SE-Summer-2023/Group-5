import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPacks: [],
};

const packsSlice = createSlice({
  name: "allpacks",
  initialState,
  reducers: {
    setAllPacks: (state, action) => {
      return { ...state, allPacks: action.payload };
    },
  },
});

export const { setAllPacks } = packsSlice.actions;
export default packsSlice.reducer;
