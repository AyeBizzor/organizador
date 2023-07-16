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
    fechaHoraInicio: "",
    fechaHoraFin: "",
    plazo: "",
    completed: false,
  });

  const createTask = (e) => {
    e.preventDefault();
    //Conseguir los datos ingresados en el form
    let pendiente = e.target.pendiente.value;
    let detalle = e.target.detalle.value;
    let fechaHoraInicio = e.target.fechaDesde.value;
    let fechaHoraFin = e.target.fechaHasta.value;
    let plazo = "No definido";
    //Creo el objeto de la tarea a guardar
    let task = {
      id: new Date().getTime(),
      pendiente,
      detalle,
      fechaHoraInicio,
      fechaHoraFin,
      plazo: calculatePlazo(fechaHoraInicio, fechaHoraFin),
      completed: false,
    };

    console.log(task);
    // Tengo que guardar el nuevo objeto en el estado
    setTaskState({
      ...taskState,
      pendiente: "",
      detalle: "",
      fechaHoraInicio: "",
      fechaHoraFin: "",
      plazo: calculatePlazo(fechaHoraInicio, fechaHoraFin),
      completed: false,
    });
    // Tengo que guardar el objeto en el localstorage donde se va convertir a objeto
    saveStorage(task);
    // Vaciar el formulario al poner "Guardar"
    e.target.reset();
    //tengo que actualizar el setlistadostate para que me aparezca automaticamente en el listado sin tener que refrescar la pantalla
    setListadoState((element) => {
      return [task, ...element]; //Tomé el task que es el que introduzco y con el spread operator hice una copia de todos los que ya estaban
    });
    console.log(task);
  };

  const calculatePlazo = (fechaInicio, fechaFin) => {
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);
    const diferenciaMilisegundos = fechaFinObj - fechaInicioObj;
    const dias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    if (dias === 0) {
      const horasRestantes = Math.floor(
        diferenciaMilisegundos / (1000 * 60 * 60)
      );
      if (horasRestantes === 0) {
        const minutosRestantes = Math.floor(
          diferenciaMilisegundos / (1000 * 60)
        );
        return `${minutosRestantes} minutos`;
      } else {
        return `${horasRestantes} horas`;
      }
    } else {
      return `${dias} días`;
    }
  };

  const saveStorage = (task) => {
    //CONSEGUIR LO QUE YA TENGO EN EL LOCAL
    let elementos = JSON.parse(localStorage.getItem("tasks"));
    //COMPROBAR SI ES UN ARRAY
    if (Array.isArray(elementos)) {
      //añadir
      elementos.push(task);
    } else {
      elementos = [task];
    }
    console.log(elementos); /* DEPURACION EN CONSOLA PARA REVISAR COMO VA */
    //GUARDAR EN EL LSTORE
    localStorage.setItem("tasks", JSON.stringify(elementos));
    //DEVOLVER OBJ
    return task;
  };

  const setCompleted = (taskId) => {
    const updatedTasks = listadoState.map((task) => {
      if (task.id === taskId) {
        console.log(taskId); //DEPURACION PARA CONTROLAR QUE TOME EL ID CORRECTO
        return {
          ...task,
          completed: !task.completed, // Invierte el valor de completed
        };
      }
      return task;
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    console.log(
      "Tareas actualizadas en el almacenamiento local:",
      updatedTasks
    ); //DEPURACION
    setListadoState(updatedTasks);
    console.log("Estado listadoState actualizado:", updatedTasks); //DEPURACION
  };

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
    <div className="app-all-container">
      <div className="titulos-app">
        <p className="titulos-app-bienvenida">
          ¡Bienvenido Fulanito son las {hsActual()}! Hoy es {diaActual()}
        </p>
      </div>
      <div className="tasksform-component">
        <Tasks
          taskState={taskState}
          setTaskState={setTaskState}
          createTask={createTask}
        />
      </div>
      <div className="tasklist-component">
        <TaskList
          listadoState={listadoState}
          setListadoState={setListadoState}
          taskState={taskState}
          setTaskState={setTaskState}
          setCompleted={setCompleted}
        />
      </div>
    </div>
  );
}

export default App;
