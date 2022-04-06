import { combineReducers } from "redux";
import broadcasting from "./broadcasting";
import failed from "./failed";
import successful from "./successful";

export * from './failed'
export * from './broadcasting'
export * from './successful'

export default combineReducers({
    failed: failed.reducer,
    broadcasting: broadcasting.reducer,
    successful: successful.reducer,
})
