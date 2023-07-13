import React, { useEffect, useState } from "react";

export const TaskList = ({ listadoState, setListadoState, taskState, setTaskState }) => {
  //const [listadoState, setListadoState] = useState([]);

  useEffect(() => {
    console.log("Tareas cargadas");
    getCurrentTasks();
  }, []);

  /* getCurrentTasks me trae un array de todas las tareas que están almacenadas en el localstorage */
  const getCurrentTasks = () => {
    let currentTask = JSON.parse(localStorage.getItem("tasks"));
    console.log(currentTask);
    if (currentTask === null) {
      setListadoState([]); // Establece el estado como un array vacío
      console.log('No está guardando el pendiente de forma correcta o está vacío')
    } else {
      setListadoState(currentTask);
    }
  };
 

  return (
    <div className="all-card-task">
      <h2 className="title-card-task">Listado de pendientes</h2>

      {listadoState != null ? (
        listadoState.map((task) => {
          return (
            <article key={task.id} className="card-task">
             <input type="checkbox"  />
              <p> Pendiente: {task.pendiente} </p>
              <p> Detalle: {task.detalle} </p>
              <p> Plazo: {task.fechaHora} </p>
            </article>
          );
        })
      ) : (
        <p>Ningún pendiente por aquí 🦗 </p>
      )}
    </div>
  );
};
