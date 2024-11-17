import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    myPosts: [],
  },
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },
  },
});

export const { setAllPosts, setMyPosts } = postsSlice.actions;
export default postsSlice.reducer;
