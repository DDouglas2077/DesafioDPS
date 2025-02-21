import React from "react";

export const Contact = ({ contact, onDelete, onToggleFavorite }) => {
  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h2>
        {contact.firstName} {contact.lastName}{" "}
        {contact.favorite && <span>⭐</span>}
      </h2>
      <p>📞 {contact.phone}</p>
      <button onClick={() => onToggleFavorite(contact.id)}>
        {contact.favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      </button>
      <button onClick={() => onDelete(contact.id)}>Eliminar</button>
    </div>
  );
};
