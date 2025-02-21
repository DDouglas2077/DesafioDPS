import React from "react";

export const Contact = ({ contact, onDelete, onToggleFavorite }) => {
  return (
    <div className={`contact ${contact.favorite ? "favorito" : ""}`}>
      <h3>
        {contact.firstName} {contact.lastName}
      </h3>
      <p>{contact.phone}</p>
      <button onClick={() => onToggleFavorite(contact.id)}>
        {contact.favorite ? "★" : "☆"} Favorito
      </button>
      <button onClick={() => onDelete(contact.id)}>Eliminar</button>
    </div>
  );
};
