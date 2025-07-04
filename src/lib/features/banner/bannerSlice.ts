import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BannerState {
  isVisible: boolean;
}

const initialState: BannerState = {
  isVisible: true
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    hideBanner: (state) => {
      state.isVisible = false;
    },
    showBanner: (state) => {
      state.isVisible = true;
    }
  }
});

export const { hideBanner, showBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
