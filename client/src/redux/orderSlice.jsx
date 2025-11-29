import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, getMyOrders, getOrderById } from "../lib/api/api";

// CREATE ORDER
export const createOrderThunk = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await createOrder(orderData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Order creation failed");
    }
  }
);

// GET USER ORDERS
export const getMyOrdersThunk = createAsyncThunk(
  "orders/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyOrders();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load orders");
    }
  }
);

// GET SINGLE ORDER
export const getOrderByIdThunk = createAsyncThunk(
  "orders/getOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getOrderById(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load order");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    error: null,
    success: false,
    order: null,
    myOrders: [],
  },
  reducers: {
    resetOrderState: (state) => {
      state.success = false;
      state.error = null;
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE ORDER
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET MY ORDERS
      .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      })

      // GET ORDER BY ID
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.order = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
