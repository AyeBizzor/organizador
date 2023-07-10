import { useEffect, useState } from "react";
import { ToDoForm } from "./components/ToDoForm";
import { ToDoList } from "./components/ToDoList";
import { Calendario } from "./components/Calendario";
import './app.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const[time, setTime] = useState(new Date());

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  }

const mesActual = () => {
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  return month.charAt(0).toUpperCase() + month.slice(1);
}

const hsActual = () => {
  const date = new Date();
let hour = date.getHours();
const minute = date.getMinutes();
const second = date.getSeconds();
hour = hour.toString().padStart(2, '0');
return `${hour}:${minute}:${second}`
}


useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000); // Actualiza la hora cada segundo
  return () => {
    clearInterval(interval); // Limpia el intervalo al desmontar el componente
  };
}, []);


  return (
    <div>
      <h1 className="titulos-app" >¡Bienvenido Fulanito son las {hsActual()}! </h1>
      <p className="leyendas-app" >Estas son tus tareas pendientes del día de hoy</p>

      <ToDoList tasks={tasks}  />
<ToDoForm addTask={addTask}   />

<div className="titulo-calendario" > Tu calendario del mes de {mesActual()} </div>

<div className="calendario" >
<Calendario/>
</div>

    </div>
  );
}

export default App;
