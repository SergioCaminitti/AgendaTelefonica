import React, { useEffect, useState } from "react";
import { Container } from "./components/Container";
import { Content } from "./components/Content";
import { ContactItem } from "./components/ContactItem";
import { Contact, listenContacts, deleteContact } from "./firebase";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { logDeletion } from "./utils/logger"; // Importa a função de log

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const unmount = listenContacts((data) => {
      setContacts(data);
      setFilteredContacts(data); // Inicializa filteredContacts com todos os contatos
    });
    return () => unmount();
  }, []);

  const handleDelete = async (id: string, contactName: string) => {
    await deleteContact(id);
    logDeletion(contactName);
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    setFilteredContacts((prevFiltered) => prevFiltered.filter((contact) => contact.id !== id));
  };

  const handleSearch = () => {
    const results = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phoneNumbers.some((number) => number.number.includes(searchQuery)) // Usando o campo 'number' de PhoneNumber
    );
    setFilteredContacts(results);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Se a caixa de pesquisa estiver vazia, restaura a lista completa
    if (value === "") {
      setFilteredContacts(contacts);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Agenda Telefônica</h1>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Digite o nome ou número"
          value={searchQuery}
          onChange={handleInputChange} // Chama a função para atualizar o valor e restaurar a lista quando vazio
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>
          Pesquisar
        </button>
      </div>

      <ul className="contact-list">
        {filteredContacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onEdit={() => navigate(`/edit/${contact.id}`)}
            onDelete={() => handleDelete(contact.id, contact.name)}
          />
        ))}
      </ul>

      <button className="add-contact-button" onClick={() => navigate("/new")}>
        Novo Contato
      </button>
    </div>
  );
};

export default App;
