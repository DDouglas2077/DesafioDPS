import React, { useState, useEffect } from "react";
import { ContactList } from "./components/ContactList";
import { Contact } from "./components/Contact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "" });

  useEffect(() => {
    fetch("/contact.json") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo JSON");
        }
        return response.json();
      })
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar contactos:", error);
        setLoading(false);
      });
  }, []);

  const addContact = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    
    const newContact = {
      id: contacts.length + 1,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      favorite: false,
    };

    setContacts([...contacts, newContact]);
    setFormData({ firstName: "", lastName: "", phone: "" }); // Limpiar formulario
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
      
      <form onSubmit={addContact}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={formData.lastName}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Número de Teléfono"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <button type="submit">Agregar Contacto</button>
      </form>

      {loading ? (
        <p>Cargando contactos...</p>
      ) : contacts.length > 0 ? (
        <ContactList
          contacts={[...contacts].sort((a, b) => b.favorite - a.favorite)}
          onDelete={deleteContact}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <p>No hay contactos disponibles</p>
      )}
    </div>
  );
}

export default App;
