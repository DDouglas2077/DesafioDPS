import React, { useState, useEffect } from "react";
import { ContactList } from "./components/ContactList";
import contactsData from "./contact.json";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setContacts(contactsData);
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
      <ContactList
        contacts={[...contacts].sort((a, b) => b.favorite - a.favorite)}
        onDelete={deleteContact}
        onToggleFavorite={toggleFavorite}
      />
      <button onClick={() => addContact("Nuevo", "Contacto", "111-222-3333")}>
        Agregar Contacto
      </button>
    </div>
  );
}

export default App;
