import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FavoriteItem = {
    id: number;
    name: string;
    brand: string;
    price: number;
    srcUrl: string; // Image URL
    fragranceType?: string; // e.g., "Attar", "Perfume"
};

export type Favorites = {
    items: FavoriteItem[];
    totalItems: number;
};

interface FavoritesState {
    favorites: Favorites | null;
}

const initialState: FavoritesState = {
    favorites: null,
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<FavoriteItem>) => {
            if (state.favorites === null) {
                state.favorites = {
                    items: [action.payload],
                    totalItems: 1,
                };
                return;
            }

            const isItemInFavorites = state.favorites.items.find(
                (item) => item.id === action.payload.id
            );

            if (!isItemInFavorites) {
                state.favorites = {
                    ...state.favorites,
                    items: [...state.favorites.items, action.payload],
                    totalItems: state.favorites.items.length + 1,
                };
            }
        },
        removeFromFavorites: (state, action: PayloadAction<number>) => {
            if (!state.favorites) return;

            state.favorites = {
                ...state.favorites,
                items: state.favorites.items.filter((item) => item.id !== action.payload),
                totalItems: state.favorites.items.length - 1,
            };

            if (state.favorites.items.length === 0) {
                state.favorites = null;
            }
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;