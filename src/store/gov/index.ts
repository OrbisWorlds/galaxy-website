import { combineReducers } from "@reduxjs/toolkit";
import proposal from './proposal'
import params from './params'
export * from './proposal'
export * from './params'


export default combineReducers({
    proposal, params
})