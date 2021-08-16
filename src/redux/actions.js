import {ADD_WORKER,CHANGE_WORKER,SET_WORKER,DELETE_WORKER} from './types'

export function addWorker(worker){
    return{
        type: ADD_WORKER,
        payload: worker
    }
}
export function deleteWorker(_id){
    return{
        type: DELETE_WORKER,
        payload: _id
    }
}
export function changeWorker(worker){
    return{
        type: CHANGE_WORKER,
        payload: worker
    }
}
export function setWorker(worker){
    return{
        type: SET_WORKER,
        payload: worker
    }
}
