import React, { useState } from 'react'
import './todoform.css';




export const ToDoForm = ({addTask}) => {
const[task, setTask] = useState('');
const[descripcion, setDescipcion] = useState('');

const taskChange = (e) => {
    setTask(e.target.value);
}

const descriptionChange= (e) => {
    setDescipcion(e.target.value);
}

const handleSubmit = (e) => {
    e.preventDefault()
    addTask({task, descripcion});
    setTask('');
    setDescipcion('');
};

  return (
    <div className='div-todo-form'  >
        <p className='encabezado' >¿Qué más tenemos por hacer? 🤘 </p>
    <form onSubmit={handleSubmit} >
    <input type='text' value={task} onChange={taskChange} placeholder='Pendiente' required  />
    <textarea type='text' value={descripcion} onChange={descriptionChange} placeholder='Descripcion'/>
    <button class="learn-more">
  <span class="circle" aria-hidden="true">
  <span class="icon arrow"></span>
  </span>
  <span class="button-text">Agregar</span>
</button>

    </form>
    </div>
  )
}


/* TodoForm:

TodoForm es el componente que permite al usuario agregar nuevas tareas.
Puede contener un formulario con campos de entrada, como título y descripción, para que el usuario ingrese los detalles de la nueva tarea.
Puede tener un botón de envío para agregar la tarea a la lista.
Puede utilizar un estado interno para almacenar temporalmente los valores de los campos de entrada antes de agregar la tarea al estado principal. */