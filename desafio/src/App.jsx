import React, { useState, useEffect } from "react";
import { ContactList } from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", apellido: "", telefono: "" });

  //  Cargar contactos desde el JSON
  useEffect(() => {
    fetch("/contacts.json") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo JSON");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Contactos cargados:", data);
        setContacts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar contactos:", error);
        setError("No se pudieron cargar los contactos.");
        setLoading(false);
      });
  }, []);

  //  Función para agregar contactos
  const addContact = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellido || !formData.telefono) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newContact = {
      id: contacts.length + 1,
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      favorito: false,
    };

    setContacts([...contacts, newContact]);
    setFormData({ nombre: "", apellido: "", telefono: "" }); // Limpiar formulario
  };

  //  Eliminar contacto
  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  //  Alternar favorito
  const toggleFavorite = (id) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, favorito: !contact.favorito } : contact
      )
    );
  };

  return (
    <div>
      <h1>Lista de Contactos</h1>

      {/*  Formulario para agregar contactos */}
      <form onSubmit={addContact}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Número de Teléfono"
          value={formData.telefono}
          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
        />
        <button type="submit">Agregar Contacto</button>
      </form>

      {/*  Mensajes de carga o error */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? <p>Cargando contactos...</p> : null}

      {/*  Mostrar lista de contactos */}
      <ContactList
        contacts={[...contacts].sort((a, b) => b.favorito - a.favorito)}
        onDelete={deleteContact}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;
