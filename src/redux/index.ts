import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import reproductiveReducer from './common.slice';

import logsReducer from './log.slice';

// 1. Combine all your reducers
const rootReducer = combineReducers({
  // Example: reproductive: reproductiveReducer,
  reproductive: reproductiveReducer,

  logs: logsReducer,
});

// 2. Setup Persistence Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Optional: whitelist specific slices to persist, blacklist others
  whitelist: ['reproductive'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions to avoid TS errors with non-serializable data
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
