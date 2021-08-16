import React from "react";
import {connect} from "react-redux";
import Worker from "./Worker";


const WorkersList = ({workers}) => { // Рендерит массив работников

    return (
        <>
            {workers.map(el => (
                 <Worker worker={el} key={el.id}/>
            ))}
        </>
    )
}

const mapStateToProps = state => {
    return {
        workers: state.workers.workers
    }
}

export default connect(mapStateToProps, null)(WorkersList)