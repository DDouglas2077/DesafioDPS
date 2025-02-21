import React, { useState, useEffect } from "react";
import { ContactList } from "./ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/contacts.json") // Carga los contactos dinámicamente
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error al cargar contactos:", error));
  }, []);

  const addContact = (firstName, lastName, phone) => {
    const newContact = {
      id: contacts.length + 1,
      firstName,
      lastName,
      phone,
      favorite: false,
    };
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const toggleFavorite = (id) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, favorite: !contact.favorite } : contact
      )
    );
  };

  return (
    <div>
      <h1>Lista de Contactos</h1>
      {contacts.length > 0 ? (
        <ContactList
          contacts={[...contacts].sort((a, b) => b.favorite - a.favorite)}
          onDelete={deleteContact}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <p>Cargando contactos...</p>
      )}
      <button onClick={() => addContact("Nuevo", "Contacto", "111-222-3333")}>
        Agregar Contacto
      </button>
    </div>
  );
}

export default App;
