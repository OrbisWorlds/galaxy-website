import { combineReducers } from 'redux'
import delegation from './delegation'
import pool from './pool'
import validator from "./validator"

export * from './pool'
export * from './validator'
export * from './delegation'

export default combineReducers({
    validator,
    pool,
    delegation,
})

