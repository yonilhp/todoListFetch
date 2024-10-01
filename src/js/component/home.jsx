import React, { useState, useEffect } from "react";

// Componente principal
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]); // Guarda la lista de las tareas que el usuario ha ingresado
  const [nameList, setnameList] = useState("");
  const [todos, setTodos] = useState([{ label: "No hay tareas para mostrar, debes ingresar nueva tarea o buscar el usuario", id: 0 }]);

  // Función para manejar el agregado de una nueva tarea (POST request)
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      try {
        const response = await fetch("https://playground.4geeks.com/todo/todos/yonil", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: inputValue.trim(),
            is_done: false,
          }),
        });

        if (response.ok) {
          const newTodo = await response.json();
          // Agregar la nueva tarea a la lista de todos
          setTodos([...todos, newTodo]);
          setInputValue("");
        } else {
          console.error("Error al agregar la tarea:", response.statusText);
        }
      } catch (error) {
        console.error("Error al agregar la tarea:", error);
      }
    }
  };

  // Maneja la eliminación de tareas obtenidas de la API
const handleRemoveTodo = async (id) => {
  try {
    const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Si la eliminación fue exitosa, actualiza el estado
      setTodos(todos.filter((item) => item.id !== id));
    } else {
      console.error("Error al eliminar el todo:", response.statusText);
    }
  } catch (error) {
    console.error("Error al eliminar el todo:", error);
  }
};

  // Maneja la eliminación de ítems
  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };
  // Busca y obtiene la lista de tareas según el usuario
const searchList = async (name) => {
  try {
    const response = await fetch(`https://playground.4geeks.com/todo/users/${name}`);
    const data = await response.json();
    console.log("Datos obtenidos de la API:", data);
    
    if (data.todos) {
      setTodos(data.todos);
      console.log("Lista de todos: ", data.todos);
    } else {
      console.log("No se encontraron todos en la respuesta.");
    }
  } catch (error) {
    console.error("Error al obtener los todos:", error);
  }
};

// Efecto para buscar la lista al cambiar el valor de nameList
useEffect(() => {
  if (nameList) {
    searchList(nameList);
  }
}, [nameList]);


  return (
    <div className="container mt-5">
      <div className="text-center mt-5 text-secondary">
        <h1 className="text-danger">Todos</h1>
      </div>
      {/* Formulario para agregar tareas */}

      <div class="container">
        <div class="row">
          <div class="col">
            <form onSubmit={handleAddItem}>
              <div className="form-group">
                <label>Ingresar tarea</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su nueva tarea"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)} // Actualiza el valor del input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddItem(e); // Agrega el ítem al presionar Enter
                    }
                  }}
                />
              </div>
            </form>

          </div>
          <div class="col">
            {/* <h1>Buscar usuario</h1> */}
            <label>Nombre del usuario</label>
            <form >
              <div className="form-group">
                <input 
                  className="form-control" 
                  value={nameList} 
                  type="text" 
                  onChange={(e) => setnameList(e.target.value)}
                  
                />
              </div>
            </form>

          </div>
        </div>
      </div>

      
      {/* Lista de ítems */}
      <ul className="list-group mt-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {item}
            <i
              className="far fa-times-circle"
              onClick={() => handleRemoveItem(index)}
              style={{ cursor: "pointer" }}
            ></i>
          </li>
        ))}
      </ul>

      
      <h1 className="text-center">Lista de tareas del usuario {nameList}</h1>
      {/* Mostrar la lista de tareas obtenidas desde la API */}
      <ul className="list-group">
        {todos.length >= 1 && todos.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.label}
            <i
              className="far fa-times-circle text-danger"
              onClick={() => handleRemoveTodo(item.id)} // Maneja la eliminación de tareas obtenidas de la API
              style={{ cursor: "pointer" }}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
