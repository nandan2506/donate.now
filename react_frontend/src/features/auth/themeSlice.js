import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themetoggle: localStorage.getItem("theme") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state) => {
      state.themetoggle = state.themetoggle === "light" ? "dark" : "light";

      const html = document.documentElement;
      if (state.themetoggle === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark"); // ✅ this is crucial
      }

      localStorage.setItem("theme", state.themetoggle);
    },

    applyInitialTheme: (state) => {
      const html = document.documentElement;
      if (state.themetoggle === "dark") {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    },
  },
});

export const { toggle, applyInitialTheme } = themeSlice.actions;
export default themeSlice.reducer;
