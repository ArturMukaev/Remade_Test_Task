import React from "react";
import {connect} from "react-redux";
import {setWorker} from "../redux/actions";



const Worker = ({worker,setWorker}) =>{ // Рендерит карточку работника

    // Присваем стиль выделения в зависимости от выбранного работника
    let colored = worker.selected?"selected":"not_selected";
    let str = "card "+colored;


    const setDate = () => { // превращает дату в формат dd.mm.yyyy
        if (worker.birth) {
            let parts = worker.birth.split("-")
            return (parts[2].toString() + "." + parts[1].toString() + "." + parts[0].toString());
        } else {
            return  ""
        }
    }

    return(
        <div className={str} onClick={() =>{setWorker(worker)}}>
            <div className="card-body">
                <h5 className="card-title">ФИО: {worker.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Должность: {worker.position}</h6>
                <div className="card-text">
                    <p>Пол: {worker.gender}</p>
                    <p>Дата рождения: {setDate()}</p>
                    <p>Уволен: {worker.working}</p>
                </div>
            </div>
        </div>
    )
}



const mapDispatchToProps = {
    setWorker
}

export default connect(null,mapDispatchToProps)(Worker)