import {configureStore, createSlice} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from 'redux'
import values from './values'

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  values,
})
const store = configureStore({
// export default persistStore(configureStore({
  reducer: persistReducer(persistConfig, rootReducer)
})
export const persistor = persistStore(store)
export default store
