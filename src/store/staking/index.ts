import { combineReducers } from 'redux'
import pool from './pool'
import validator from "./validator"

export * from './pool'
export * from './validator'

export default combineReducers({
    validator,
    pool,
})

