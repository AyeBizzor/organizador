import React, { useState } from 'react'
import { ToDoForm } from './ToDoForm';
import './todolist.css';

export const ToDoList = ({tasks}) => {

  return (

    <div className='todo-list' >
        <p className='leyenda-todolist' >Tareas para hoy: </p>
        {tasks.map( (task, index) =>    
        <div key={index} className='task-field' >
                <div className='task'>{task.task} | <p className='task-descrp'> Detalle: {task.descripcion} </p>   </div>
      </div>  )}
       
    </div>
  )
}


/* TodoItem:

TodoItem representa cada tarea individual en la lista.
Recibe una tarea como una propiedad (task) que contiene información como el título, descripción, estado (completada o no) y cualquier otra propiedad relevante.
Renderiza la información de la tarea, como el título y la descripción.
Puede tener una casilla de verificación o un botón para marcar la tarea como completada.
Puede tener un botón para eliminar la tarea. */