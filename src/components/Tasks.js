import React, { useState } from "react";
import "./tasks.css";

export const Tasks = ({ taskState, createTask }) => {
  const { pendiente, detalle } = taskState;
  const [visibility, setVisibility] = useState(false);

  /* Funciones para acciones */

  /* DESPLEGAR FORMULARIO */
  const toggleForm = () => {
    setVisibility(!visibility);
  };

  return (
    <div>
      <div className="div-form">
        <div  className="boton-add-task" >
        <button  className="add-task"  onClick={toggleForm}>AGREGAR PENDIENTE   <span className="desplegar">   ➕</span>  </button>
        
        </div>
        {visibility && (
          <div>
            <div className="titulos-app-taskform">
              <p>¿Qué haremos el día de hoy? 💻 </p>
            </div>

            <form onSubmit={createTask}>
              <input
                type="text"
                id="pendiente"
                name="pendiente"
                placeholder="Pendiente"
                required
              />
              <textarea
                type="text"
                id="detalle"
                name="detalle"
                placeholder="Detalle"
              />
              <div className="plazos" >

              <div className="desde-hasta" >
              <p className="titulos-app-form">
                Guardalo en tu agenda para ver los plazos📲
              </p>
              <p className="desde">Desde</p>
              <input type="datetime-local" id="fechaDesde" name="fechaDesde" />
              <p className="hasta">Hasta</p>
              <input type="datetime-local" id="fechaHasta" name="fechaHasta" />
              </div>
              </div>
              <input type="submit" id="save" value="Guardar" />
            </form>
          </div>
        )}

        <p>{pendiente && detalle && "Tarea añadida con éxito"}</p>
      </div>
    </div>
  );
};
