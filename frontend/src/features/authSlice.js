import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../contexts/axios";

/* SIGN UP */
export const signUpUser = createAsyncThunk(
    "auth/signUp",
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/signUp", data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

/* LOGIN */
export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/signIn", data);
            console.log(res,"User Data in auth slice")
            return res.data.data; 
        } catch (err) {
            return rejectWithValue(err.response?.data?.message);
        }
    }
);

/* CHECK COOKIE (REFRESH) */
export const fetchMe = createAsyncThunk(
    "auth/me",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/user/me");
            return res.data.data;
        } catch {
            return rejectWithValue();
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        authChecked: false,
    },
    reducers: {
        resetAuthState: (state) => {
            state.loading = false;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            /* LOGIN */
            .addCase(loginUser.fulfilled, (state, action) => {
  state.user = action.payload;
  state.isAuthenticated = true;
  state.loading = false;
})

            /* SIGNUP */
            .addCase(signUpUser.fulfilled, (state) => {
                state.loading = false;
            })

            /* FETCH ME */
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.authChecked = true;  
                state.loading = false;
            })

            .addCase(fetchMe.rejected, (state) => {
                state.authChecked = true;
                state.loading = false;
            })


            /* COMMON */
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export const { logout } = authSlice.actions;
export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
