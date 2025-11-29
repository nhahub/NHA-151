import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/users';

export const fetchUsers = createAsyncThunk('adminUsers/fetchUsers', async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const { data } = await axios.get(API_URL, config);
    return data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchUser = createAsyncThunk('adminUsers/fetchUser', async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const { data } = await axios.get(`${API_URL}/${id}`, config);
    return data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const createUser = createAsyncThunk('adminUsers/createUser', async (user, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const { data } = await axios.post(API_URL, user, config);
    return data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateUser = createAsyncThunk('adminUsers/updateUser', async ({ id, user }, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const { data } = await axios.put(`${API_URL}/${id}`, user, config);
    return data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteUser = createAsyncThunk('adminUsers/deleteUser', async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const { data } = await axios.delete(`${API_URL}/${id}`, config);
    return data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const adminUsersSlice = createSlice({
  name: 'adminUsers',
  initialState: {
    users: [],
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.success = true;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.success = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map(u => u._id === action.payload._id ? action.payload : u);
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter(u => u._id !== action.payload._id);
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminUsersSlice.reducer;

// All thunks are already exported above. Removed duplicate named export block.
