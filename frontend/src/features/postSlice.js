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
            // console.log("Data from backend:", res.data.posts);
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

            // console.log(res,"RES IN FRONTEND OF CREATING THUNK")

            return res.data.post;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const getMyPosts = createAsyncThunk("user/getMyPost",
    async (userId, { rejectWithValue }) => {
        try {
            const res = await api.get("/post/getMyPosts")
            return res.data.data
        } catch (error) {
            console.log(error, "Error in Get My Posts thunnk")
            return rejectWithValue(error)
        }
    }
)

export const updatePost = createAsyncThunk(
    "post/updatePost",
    async ({ postId, text }, { rejectWithValue }) => {
        try {
            const res = await api.patch(`/post/update/${postId}`, { text });
            return res.data.data; // updated post
        } catch (error) {
            console.log(error, "Error in updating the post")
            return rejectWithValue(
                error.response?.data?.message || "Error updating post"
            );
        }
    }
);

export const createComment = createAsyncThunk("post/comment",
    async ({ postId, comment }, { rejectWithValue }) => {
        try {
            const res = await api.post(`/post/comment/${postId}`, { comment })
            return res.data.data
        } catch (error) {
            console.log(error, "Error in commenting the post")
            return rejectWithValue(
                error.response?.data?.message || "Error updating post"
            );
        }
    }
)


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

            .addCase(getMyPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getMyPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })

            .addCase(getMyPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(updatePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false;

                const updatedPost = action.payload;

                const post = state.list.find(
                    (p) => p._id === updatedPost._id
                );

                if (post) {
                    post.text = updatedPost.text
                }
            })


            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //COMMENT
            .addCase(createComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false;

                const updatedPost = action.payload;

                const index = state.list.findIndex(
                    (post) => post._id === updatedPost._id
                );

                if (index !== -1) {
                    state.list[index] = {
                        ...state.list[index],
                        ...updatedPost,
                        
                        user: state.list[index].user,
                    };
                }
            })

            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default postSlice.reducer