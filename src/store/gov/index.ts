import { combineReducers } from "@reduxjs/toolkit";
import proposal from './proposal'
export * from './proposal'


export default combineReducers({
    proposal: proposal
})