import React from "react";
import { Contact } from "../firebase";

interface ContactItemProps {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
}

export const ContactItem: React.FC<ContactItemProps> = ({ contact, onEdit, onDelete }) => {
  const displayPhoneNumber =
    contact.phoneNumbers && contact.phoneNumbers.length > 1
      ? `${contact.phoneNumbers[0].number} ...`
      : contact.phoneNumbers[0]?.number;

  return (
    <li className="contact-item">
      <div className="contact-details">
        <span className="contact-name">{contact.name} - </span>
        <span className="contact-phone">{displayPhoneNumber}</span>
      </div>
      <div className="contact-actions">
        <button onClick={onEdit} className="edit-button">Editar</button>
        <button onClick={onDelete} className="delete-button">Excluir</button>
      </div>
    </li>
  );
};
