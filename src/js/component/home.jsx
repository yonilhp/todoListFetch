import React, { useState } from "react";
import { Container, Form, ListGroup } from "react-bootstrap";

// Crear el componente Home
const Home = () => {
  const [inputValue, setInputValue] = useState(""); // Estado para el valor del input
  const [items, setItems] = useState([]); // Estado para los elementos de la lista

  const handleAddItem = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()]); // Agrega el nuevo elemento a la lista
      setInputValue(""); // Limpia el campo de entrada
    }
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index)); // Elimina el elemento en el índice dado
  };

  return (
    <Container className="mt-5">
		<div className="text-center mt-5 text-secondary">
			<h1>todos</h1>
		</div>
      <Form onSubmit={handleAddItem}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="whats needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Actualiza el valor del input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddItem(e); // Agrega el item al presionar Enter
              }
            }}
          />
        </Form.Group>
      </Form>
      <ListGroup className="mt-3">
        {items.map((item, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            {item}
            <i className="far fa-times-circle" onClick={() => handleRemoveItem(index)}
			></i>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Home;
