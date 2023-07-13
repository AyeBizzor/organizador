import React, { useState } from "react";

export const Tasks = ({ taskState, setTaskState, createTask, setCompleted }) => {
    const { pendiente, detalle, fechaHora } = taskState;

  
  return (
    <div>
      <div className="div-form">
        <p>¿Qué haremos el día de hoy?</p>
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
          <p>Guardalo en tu agenda 📲 </p>
          <input
            type="datetime-local"
            id="fechaHora"
            name="fechaHora"
            placeholder="Colocá los plazos"
           
           
          />

          <input type="submit" id="save" value="Guardar"></input>
        </form>

        <p>{pendiente && detalle && "Tarea añadida con éxito"}</p>
      </div>
    </div>
  );
};
