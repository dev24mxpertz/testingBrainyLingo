import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Create_Questions } from "../Actions/QuestionAction";

let intialState = {
  loading: false,
};

const QuestionSlice = createSlice({
  name: "Question",
  initialState: intialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Create_Questions.pending, (state) => {
        state.loading = true;
      })
      .addCase(Create_Questions.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(Create_Questions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default QuestionSlice.reducer;
