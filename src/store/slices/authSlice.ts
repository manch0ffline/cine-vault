import { supabase } from "@/src/lib/supabase";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// #region Types
interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
// #endregion Types

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

// #region api Thunks
export const signInThunk = createAsyncThunk(
  "auth/signIn",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return rejectWithValue(error.message);
    if (!data.user) return rejectWithValue("User not found");

    return { id: data.user.id, email: data.user.email ?? "" };
  },
);

export const signUpThunk = createAsyncThunk(
  "auth/signUp",
  async (
    {
      email,
      password,
      fullName,
    }: { email: string; password: string; fullName: string },
    { rejectWithValue },
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { fullName } },
    });
    if (error) return rejectWithValue(error.message);
    if (!data.user) return rejectWithValue("User not found");

    const hasSession = Boolean(data.session?.user);
    return {
      user: hasSession
        ? { id: data.user.id, email: data.user.email ?? "" }
        : null,
      hasSession,
    };
  },
);

export const checkSessionThunk = createAsyncThunk(
  "auth/checkSession",
  async (_, { rejectWithValue }) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) return rejectWithValue(error.message);
    if (!session?.user) return null;

    return { id: session.user.id, email: session.user.email ?? "" };
  },
);
// #endregion api Thunks

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    clearAuth(state) {
      state.user = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // #region Check Session
    builder.addCase(checkSessionThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(checkSessionThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(checkSessionThunk.rejected, (state, action) => {
      state.user = null;
      state.isLoading = false;
      state.error = action.payload as string;
    });
    // #endregionCheck Session

    // #region SignIn
    builder.addCase(signInThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(signInThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    // #endregion SignIn

    // #region SignUp
    builder.addCase(signUpThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    // #endregion SignUp
  },
});

export const { clearAuth, setUser } = authSlice.actions;
export default authSlice.reducer;
