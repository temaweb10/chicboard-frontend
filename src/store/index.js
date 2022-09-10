import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./authReducer";
const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
