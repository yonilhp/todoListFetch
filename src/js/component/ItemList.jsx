import React from "react";
import { ListGroup } from "react-bootstrap";

// Componente para la lista de ítems
const ItemList = ({ items, handleRemoveItem }) => {
  return (
    <ListGroup className="mt-3">
      {items.map((item, index) => (
        <ListGroup.Item
          key={index}
          className="d-flex justify-content-between align-items-center"
        >
          {item}
          <i
            className="far fa-times-circle"
            onClick={() => handleRemoveItem(index)}
          ></i>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ItemList;
