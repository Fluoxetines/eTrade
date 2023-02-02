import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import registerUserReducer from "./reducer/userReducer.js";
import loginUserReducer from "./reducer/userReducer.js";

const finalReducer = combineReducers({
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
});

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  loginUserReducer: {
    currentUser: currentUser,
  },
};

const composeEnhancers = composeWithDevTools({});
const Store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default Store;
