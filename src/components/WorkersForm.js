import React, {useEffect, useState, useRef} from "react";
import {connect} from "react-redux";
import {addWorker, changeWorker, deleteWorker} from "../redux/actions";
import {useStateWithCallbackLazy} from 'use-state-with-callback';

const WorkersForm = (props) => { // "Карточка работника" для изменения данных о нем или добавления нового работника
    const [count, setCount] = useState(1);
    const [human, setHuman] = useStateWithCallbackLazy(props.worker);


    useEffect(() => { // Обновляем состояние при изменении активного работника (props.worker)
        setHuman(props.worker, (currentHuman) => {
            switch (currentHuman.gender) { // Устанавливаем правильные чекбоксы
                case "мужской":
                    check1.current.checked = true;
                    check2.current.checked = false;
                    break;
                case "женский":
                    check2.current.checked = true;
                    check1.current.checked = false;
                    break;
                default:
                    check2.current.checked = false;
                    check1.current.checked = false;
                    break;
            }
            if (currentHuman.working === "да") {
                check3.current.checked = true;
            } else {
                check3.current.checked = false;
            }
        });
    }, [props.worker, setHuman]);

    // Для управления чекбоксами
    const check1 = useRef(null);
    const check2 = useRef(null);
    const check3 = useRef(null);


    const changeHandler = event => { // Функция для изменения состояния при вводе пользователя
        if (event.target.name === "working") {
            setHuman({...human, [event.target.name]: event.target.checked ? "да" : "нет"}, (currentHuman) => {
                props.changeWorker(currentHuman); // Меняем активного работника
            });
        } else {
            setHuman({...human, [event.target.name]: event.target.value}, (currentHuman) => {
                props.changeWorker(currentHuman);
            });
        }
    }


    const submitHandler = event => { // Функция для отправки формы (добавление нового сотрудника)
        event.preventDefault();
        if (!human.name.trim() || !human.position) {
            alert("Не заполнены поле ФИО или должность!");
        } else {
            props.addWorker({...human, id: count, selected: true});
            setCount(count + 1);
        }
    }


    const deleteHandler = event => { // Функция для удаления выбранного сотрдуника
        props.deleteWorker(props.worker.id);
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label className="form-label">ФИО</label>
                    <input
                        className="form-control"
                        id="name"
                        value={human.name}
                        name="name"
                        onInput={changeHandler}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Дата рождения</label>
                    <input
                        className="form-control"
                        type="date"
                        id="birth"
                        value={human.birth}
                        name="birth"
                        onInput={changeHandler}
                    />
                </div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <label className="form-label">Пол</label>
                            <p><input
                                name="gender"
                                className="form-check-input"
                                type="radio"
                                value="мужской"
                                ref={check1}
                                id="gender1"
                                onInput={changeHandler}
                            /> Мужской
                                <br/><input
                                    name="gender"
                                    className="form-check-input"
                                    type="radio"
                                    id="gender2"
                                    value="женский"
                                    ref={check2}
                                    onInput={changeHandler}
                                /> Женский</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3 form-check mt">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="working"
                                name="working"
                                value="да"
                                ref={check3}
                                onInput={changeHandler}
                            />
                            <label className="form-check-label">Уволен</label>
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <label className="form-label mr">Должность</label>
                    <select className="form-select" aria-label="Default select example"
                            id="position"
                            name="position"
                            value={human.position}
                            onInput={changeHandler}>
                        <option defaultValue disabled/>
                        <option value="Аналитик">Аналитик</option>
                        <option value="Frontend разработчик">Frontend разработчик</option>
                        <option value="Backend разработчик">Backend разработчик</option>
                        <option value="Преподаватель">Преподаватель</option>
                    </select>
                </div>
                <button type="submit" id="add" className="btn btn-success fl"
                        disabled={props.worker.selected}>Добавить
                </button>
            </form>
            <button id="delete" className="btn btn-danger ml" onClick={deleteHandler}
                    disabled={!props.worker.selected}>Удалить
            </button>
        </>
    )
}

const mapStateToProps = state => {
    return {
        worker: state.workers.activeWorker
    }
}
const mapDispatchToProps =
    {
        addWorker,
        deleteWorker,
        changeWorker
    }


export default connect(mapStateToProps, mapDispatchToProps)(WorkersForm)