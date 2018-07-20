import { combineReducers } from 'redux'
import generateGrid from './generateGrid'

export default combineReducers({
    generate : generateGrid
})