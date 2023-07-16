import React, { useEffect, useState } from "react";
import "./tasklist.css";

export const TaskList = ({
  listadoState,
  setListadoState,
  taskState,
  setTaskState,
  setCompleted,
}) => {
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
      console.log("No está guardando el pendiente de forma correcta"); //DEPURACION
    } else {
      setListadoState(currentTask);
    }
  };

/*   const [visibility, setVisibility] = useState(null);

  

 
  const toggleLabel = (index) => {
    console.log(index)
    if(visibility === index) {
      setVisibility(null);
    } else {
      setVisibility(index)
    }
    
  };
 */

  return (
    <div className="all-card-task">
      <div className="container-card-task">
        <h2 className="title-card-task">Listado de pendientes</h2>
        {listadoState != null ? (
          listadoState.map((task) => {
            return (
              <article key={task.id} className="card-task">
                 {/* Checkbox */}
                <div className="checkbox-container" >
                 
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => setCompleted(task.id)}
                /></div>
                 {/* Checkbox */}
                <label className="label-task"   >
                
                {/* Pendiente */}
                <div className="pendiente-container"  >
                <p className={task.completed ? "completed" : ""}>
                  {" "}
                  Pendiente: {task.pendiente}{" "}
                </p>
                </div>
                </label>
               

<label className="detalle-plazos" >

{/* plazos */}
<div className="plazo" >
<p>  Plazo: {task.plazo}  </p>
</div>
{/* plazos */}

{/* detalle */}

<div className="card-task-detail">
  <p className={task.completed ? "completed" : ""}>
    {" "}
    Detalle: {task.detalle}{" "}
  </p>
</div>

</label>
                
              
              </article>
            );
          })
        ) : (
          <p>Ningún pendiente por aquí 🦗 </p>
        )}
      </div>
    </div>
  );
};
