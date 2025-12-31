import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../contexts/axios";


const initialState = {
    loading: false,
    creating: false,
    error: null,
    list: []
}

export const getAllPosts = createAsyncThunk("user/allposts",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/post/getAllPosts")
            console.log("Data from backend:", res.data.posts);
            return res.data.posts //all posts
        } catch (error) {
            console.log("Error in thunk:", error);
            return rejectWithValue(error.response?.data?.message);
        }
    }
)

export const deletePost = createAsyncThunk("post/deletePost",
    async (postId, { rejectWithValue }) => {
        try {
            await api.delete(`/post/delete/${postId}`);
            return postId;
        } catch (error) {
            console.log("Error in Delete thunk:", error);
            return rejectWithValue(error.response?.data?.message);
        }
    }
)

export const createPost = createAsyncThunk(
    "post/createPost",
    async ({ text, file }, { rejectWithValue }) => {
        try {
            // 1. upload image
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await api.post("/post/upload", formData);
            const imageUrl = uploadRes.data.data.file_url;

            // 2. create post
            const res = await api.post("/post/create", {
                text,
                image: imageUrl,
            });

            return res.data.post; // 👈 IMPORTANT (new post object)
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);


const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deletePost.fulfilled, (state, action) => {
                state.list = state.list.filter(
                    post => post._id !== action.payload
                );
            })

            .addCase(createPost.pending, (state) => {
                state.creating = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.creating = false;
                state.list.unshift(action.payload);
            })
            .addCase(createPost.rejected, (state) => {
                state.creating = false;
            })
    }
})

export default postSlice.reducer