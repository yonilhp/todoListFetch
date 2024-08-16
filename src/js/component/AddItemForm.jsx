import React from "react";
import { Form } from "react-bootstrap";

// Componente para el formulario de adición de ítems con sus 3 props
const AddItemForm = ({ inputValue, setInputValue, handleAddItem }) => {
  return (
    <Form onSubmit={handleAddItem}>
      <Form.Group controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="What's needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Actualiza el valor del input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddItem(e); // Agrega el item al presionar Enter
            }
          }}
        />
      </Form.Group>
    </Form>
  );
};

export default AddItemForm;
