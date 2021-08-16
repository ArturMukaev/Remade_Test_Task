import React from "react";
import WorkersList from "./components/WorkersList";
import WorkersForm from "./components/WorkersForm";

function App() {
  return (
   <div className="container">
       <div className="row">
           <div className="col">
               <h1>Список сотрудников</h1>
               <WorkersList/>
           </div>
           <div className="col">
               <h1>Карточка сотрудника</h1>
               <WorkersForm/>
           </div>
       </div>
   </div>
  );
}

export default App;
