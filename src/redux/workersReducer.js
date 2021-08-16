import {ADD_WORKER,CHANGE_WORKER,SET_WORKER,DELETE_WORKER} from "./types";

const initialState = { // начальное состояние
    workers: [{
        name: "Мукаев Артур Салаватович",
        birth: "2001-05-24",
        gender: "мужской",
        working: "нет",
        position: "Frontend разработчик",
        id: 0,
        selected: false
    }],
    activeWorker: {
        name: "",
        birth:"",
        gender: "",
        working: "нет",
        position: "",
        selected: false
    }
}

export const workersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WORKER:  // Добавление нового сотрудника
            return {
                workers: state.workers.concat(action.payload),
                activeWorker: {...action.payload,selected:true}
            }
        case DELETE_WORKER:  // Удаление сотрудника
            return {
                workers: state.workers.filter(worker => worker.id !== action.payload),
                activeWorker: initialState.activeWorker
            }
        case SET_WORKER: // Установка сотрудника активным
            return {
                workers: state.workers.map(el=>{
                    if(el.id === action.payload.id){
                        return {...el,selected: !el.selected};
                    }
                    return {...el,selected: false};
                }),
                activeWorker: action.payload.selected? initialState.activeWorker: {...action.payload,selected: true}
            }
        case CHANGE_WORKER: // Изменение активного сотрудника
            return {
                workers: state.workers.map(el=>{
                    if(el.id === action.payload.id){
                        return action.payload
                    }
                    return el
                }),
                activeWorker: action.payload
            }
        default:
            return state
    }
}