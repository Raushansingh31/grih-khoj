import { combineReducers, configureStore } from '@reduxjs/toolkit'; //These functions are from @reduxjs/toolkit. combineReducers is used to combine multiple reducers into a single root reducer, and configureStore is used to create the Redux store.
import userReducer from './user/userSlice'; //user-related reducer, typically handling the user state.
import { persistReducer, persistStore } from 'redux-persist'; //saving the state of Redux store to a persistent storage location, such as localStorage or sessionStorage in the browser, even after the user refreshes the page 
import storage from 'redux-persist/lib/storage'; //default storage engine for redux-persist, typically the browser's localStorage.

const rootReducer = combineReducers({ user: userReducer }); // combine reducer

const persistConfig = { //Persist Configuration
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
