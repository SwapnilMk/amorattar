import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from '@/components/storage';
import productsReducer from './features/products/productsSlice';
import cartsReducer from './features/carts/cartsSlice';
import bannerReducer from './features/banner/bannerSlice';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['carts', 'banner']
};

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartsReducer,
  banner: bannerReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      })
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

const store = makeStore().store;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
