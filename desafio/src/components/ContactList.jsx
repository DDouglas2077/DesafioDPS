import React from "react";
import { Contact } from "./Contact";


export const ContactList = ({ contacts, onDelete, onToggleFavorite }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};