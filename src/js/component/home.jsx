import { stringify } from "query-string";
import React, { useState, useEffect } from "react";

const ToDo = () => {
  //Get a la lista de tareas

  //Put para agregar una tarea
  //Put para borrar una tarea

  const initialValue = {
    label: "",
    done: false,
  };
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState(initialValue);
  const [isShown, setIsShown] = useState(-1);

  const api = "https://assets.breatheco.de/apis/fake/todos/user/Keialex17";

  const createUser = async () =>{
    const responseCreateUser= await fetch(api, {
      method: "POST" ,
      body: JSON.stringify ([]),
      headers: {
        "Content-Type": "application/json",
      }
    })
  if(responseCreateUser.ok){
    getTask()
  }
  }

  const getTask = async () => {
    const response = await fetch(api);
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      setTaskList(data);
    }
    else if (response.status == 404){
      createUser()
    }
  };

  const handlertask = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handlerKeyPress = async (event) => {
    // event.preventDefault();

    if (event.key == "Enter" && task != "") {
      const responseAddMember = await fetch(api, {
        method: "PUT", // or 'PUT'
        body: JSON.stringify([...taskList, task]),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (responseAddMember.ok) {
        getTask();
        setTask(initialValue);
      }
    }
  };
  const handlerButtomDelete = async (indexid) => {
    const deleteList=  taskList.filter((tarea, index) => index != indexid)
    const responseDeleteMember= await fetch(api, {
      method: "PUT", // or 'PUT'
      body: JSON.stringify(deleteList),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(responseDeleteMember.ok){
      getTask()
    }
  };

  const handlerButtomDeleteAll = async () => {
    const responseDeleteAll= await fetch(api, {
      method: "DELETE"
    }) 
    if(responseDeleteAll.ok){
      getTask()
    }
  }
  

  useEffect(() => {
    getTask();
  }, []);
  return (
    <div className="container">
      <div className="row vh-100 colores">
        <div className="title d-flex justify-content-center pt-2">
          <h1>Lista de tareas</h1>
        </div>
        {/* <button onClick={()=> createUser()}> Crear usuario</button> */}
        <div className="col-3"></div>
        <div className="col-6">
          <div className="Card" id="card">
            <div className="form-floating mb-3">
              <input
                onChange={handlertask}
                value={task.label}
                onKeyDown={handlerKeyPress}
                type="text"
                className="form-control  "
                id="floatingInput"
                placeholder="Tarea por hacer"
                name="label"
              />

              <label htmlFor="floatingInput">
                No hay tareas, añadir tareas.
              </label>
              <div className="task"></div>
              {taskList.map((tarea, i) => {
                return (
                  <span
                    className="d-flex justify-content-between py-2 px-3 g-tareas text-black my-1
              rounded-1 border border border-info"
                    key={`s-${i}`}
                    onMouseEnter={() => {
                      setIsShown(i);
                    }}
                    onMouseLeave={() => {
                      setIsShown(-1);
                    }}
                  >
                    <h2 key={i}>{tarea.label}</h2>

                    {isShown == i && (
                      <i
                        className="fas fa-minus-circle mt-3 ms-4 position-relative me-3 "
                        key={`p-${i}`}
                        onClick={() => {
                          handlerButtomDelete(i);
                        }}
                      ></i>
                    )}
                  </span>
                );
              })}
              <div className="title d-flex justify-content-center pt-2">
              <button onClick={()=> handlerButtomDeleteAll()} className="title d-flex justify-content-center py-2 px-3 g-tareas text-black my-1
              rounded-1"> <i className="fas fa-trash"> Borrar todo </i></button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
