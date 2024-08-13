import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import AddItemForm from './AddItemForm'; // Asegúrate de que la ruta sea correcta
import ItemList from './ItemList'; // Asegúrate de que la ruta sea correcta

// Componente principal
const Home = () => {
  const [inputValue, setInputValue] = useState(""); 
  const [items, setItems] = useState([]); 

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
      <ItemList 
        items={items} 
        handleRemoveItem={handleRemoveItem} 
      />
    </Container>
  );
};

export default Home;
