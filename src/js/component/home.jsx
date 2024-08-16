import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import AddItemForm from "./AddItemForm"; // Asegúrate de que la ruta sea correcta
import ItemList from "./ItemList"; // Asegúrate de que la ruta sea correcta

// Componente principal
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const getUsersList = () => {
    fetch("https://playground.4geeks.com/todo/users")
      .then((response) => response.json())
      .then((data) => {
        setUsersList(data.users);
        console.log("esta es la data: ", data.users);
        console.log("Este es el estado local: ", usersList);
      });
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <Container className="mt-5">
      <div className="text-center mt-5 text-secondary">
        <h1>Todos</h1>
      </div>
      <AddItemForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleAddItem={handleAddItem}
      />
      <ItemList items={items} handleRemoveItem={handleRemoveItem} />
      <h1>Lista de usuarios</h1>
      <ul>
        {usersList &&
          usersList.map((item) => {
            return (
              <div>
                <li>{item.name}</li>
              </div>
            );
          })}
      </ul>
    </Container>
  );
};

export default Home;
