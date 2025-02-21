import React from "react";

export const Contact = ({ contact, onDelete, onToggleFavorite }) => {
  return (
    <div className={`contact-item ${contact.favorito ? "favorito" : ""}`}>
      <h2>
        {contact.nombre} {contact.apellido} {contact.favorito && <span>❤️</span>}
      </h2>
      <p>📱 {contact.telefono}</p>
      <div className="contact-actions">
        <button onClick={() => onToggleFavorite(contact.id)}>
          {contact.favorito ? "Quitar de favoritos" : "Añadir a favoritos"}
        </button>
        <button onClick={() => onDelete(contact.id)}>Eliminar</button>
      </div>
    </div>
  );
};