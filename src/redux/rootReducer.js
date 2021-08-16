import {combineReducers} from "redux";
import {workersReducer} from "./workersReducer";



export const rootReducer = combineReducers({
    workers: workersReducer
})