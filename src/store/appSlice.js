import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModel: null,
  availableModels: [],
  activeSize: 'M',
  activeColor: '#FFFFFF',
  isLoading: false,
  error: null,
  userMeasurements: null,
  viewMode: '3d', // '3d', 'ar'
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveModel: (state, action) => {
      state.activeModel = action.payload;
    },
    setAvailableModels: (state, action) => {
      state.availableModels = action.payload;
    },
    setActiveSize: (state, action) => {
      state.activeSize = action.payload;
    },
    setActiveColor: (state, action) => {
      state.activeColor = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUserMeasurements: (state, action) => {
      state.userMeasurements = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const {
  setActiveModel,
  setAvailableModels,
  setActiveSize,
  setActiveColor,
  setLoading,
  setError,
  setUserMeasurements,
  setViewMode,
} = appSlice.actions;

export default appSlice.reducer;