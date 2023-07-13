import { useEffect, useState } from "react";

import "./app.css";
import { Tasks } from "./components/Tasks";
import { TaskList } from "./components/TaskList";

function App() {
  /* LISTADO PRINCIPAL DE TAREAS */
  const [listadoState, setListadoState] = useState([]);
  /* LOGICA PARA GUARDAR TAREAS A TRAVÉS DE UN FORM */
  const [taskState, setTaskState] = useState({
    pendiente: "",
    detalle: "",
    fechaHora: '',
    completed: false,
  });

  const { pendiente, detalle, fechaHora } = taskState;

  const createTask = (e) => {
    e.preventDefault();
    //Conseguir los datos ingresados en el form
    let pendiente = e.target.pendiente.value;
    let detalle = e.target.detalle.value;
    let fechaHora = e.target.fechaHora.value;
    //Creo el objeto de la tarea a guardar
    let task = {
      id: new Date().getTime(),
      pendiente,
      detalle,
      fechaHora,
      completed: false,
    };

    console.log(task);
    // Tengo que guardar el nuevo objeto en el estado
    setTaskState({
      ...taskState,
      pendiente: "",
      detalle: "",
      fechaHora: "",
      completed: false
    })
    // Tengo que guardar el objeto en el localstorage donde se va convertir a objeto
     saveStorage(task) 
    // Vaciar el formulario al poner "Guardar"
    e.target.reset(); 
    //tengo que actualizar el setlistadostate para que me aparezca automaticamente en el listado sin tener que refrescar la pantalla 
    setListadoState((element) => {
      return [task, ...element ] //Tomé el task que es el que introduzco y con el spread operator hice una copia de todos los que ya estaban
    })
  console.log(task)
  };


  const saveStorage = task => {
    //CONSEGUIR LO QUE YA TENGO EN EL LOCAL
    let elementos =JSON.parse(localStorage.getItem('tasks'))
    //COMPROBAR SI ES UN ARRAY
    if(Array.isArray(elementos)){
    //añadir
    elementos.push(task)
    }else{
    elementos = [task]
    }
    console.log(elementos) /* DEPURACION EN CONSOLA PARA REVISAR COMO VA */
    //GUARDAR EN EL LSTORE
    localStorage.setItem('tasks', JSON.stringify(elementos))
    //DEVOLVER OBJ
    return task
    }

  
  /* DIA PARA EL USUARIO */

  const [time, setTime] = useState(new Date());
  const diaActual = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const capitalizeMonth = month.charAt(0).toUpperCase() + month.slice(1);

    return `${day} de ${capitalizeMonth}`;
  };

  /* HORARIO PARA EL USUARIO */

  const hsActual = () => {
    const date = new Date();
    let hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    hour = hour.toString().padStart(2, "0");
    const formattedSecond = second.toString().padStart(2, "0");
    const formattedMinutes = minute.toString().padStart(2, "0");
    return `${hour}:${formattedMinutes}:${formattedSecond}`;
  };


    /* USEFFECT PARA QUE ACTUALICE EL SEGUNDERO  */
    /* No lo entiendo pero funciona 👍👌 */

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
      <h1 className="titulos-app">
        ¡Bienvenido Fulanito son las {hsActual()}! Hoy es {diaActual()}
      </h1>
      <Tasks
        taskState={taskState}
        setTaskState={setTaskState}
        createTask={createTask}
        
      />
    <TaskList listadoState={listadoState} setListadoState={setListadoState} taskState={taskState}
        setTaskState={setTaskState} />


    </div>
  );
}

export default App;
