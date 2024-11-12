import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addContact, getContact, updateContact } from "../firebase";
import "../App.css";

const NewContact: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([""]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const loadContact = async () => {
      if (id) {
        const contact = await getContact(id);
        if (contact) {
          setName(contact.name);
          setAge(contact.age.toString());
          setPhoneNumbers(contact.phoneNumbers.map(phone => phone.number));
        }
      }
    };
    loadContact();
  }, [id]);

  const addPhoneNumber = () => setPhoneNumbers([...phoneNumbers, ""]);

  const removePhoneNumber = (index: number) => {
    setPhoneNumbers(prevNumbers => prevNumbers.filter((_, i) => i !== index));
  };

  const formatPhoneNumber = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    return cleanedValue.slice(0, 11);
  };

  const handlePhoneChange = (index: number, value: string) => {
    const updatedNumbers = [...phoneNumbers];
    updatedNumbers[index] = formatPhoneNumber(value);
    setPhoneNumbers(updatedNumbers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contactData = { name, age: parseInt(age), phoneNumbers };

    if (id) {
      await updateContact(id, { ...contactData, phoneNumbers: phoneNumbers.map((number, index) => 
        ({ id: `${index}`, number, includes: (searchQuery: string) => number.includes(searchQuery) })), id });
    } else {
      await addContact(contactData);
    }

    navigate("/");
  };

  return (
    <div className="new-contact-container">
      <button className="close-button" onClick={() => navigate("/")}>✖</button>
      <h1 className="new-contact-title">{id ? "Editar Contato" : "Novo Contato"}</h1>
      <form className="new-contact-form" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="number"
          placeholder="Idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        {phoneNumbers.map((phone, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              className="input-field"
              type="tel"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => handlePhoneChange(index, e.target.value)}
              required
            />
            {index === phoneNumbers.length - 1 && (
              <button type="button" className="add-phone-button" onClick={addPhoneNumber}>+</button>
            )}
            {phoneNumbers.length > 1 && (
              <button type="button" className="delete-button" onClick={() => removePhoneNumber(index)}>
                Remover
              </button>
            )}
          </div>
        ))}
        <button type="submit" className="include-button">
          {id ? "Salvar Alterações" : "Incluir Contato"}
        </button>
      </form>
    </div>
  );
};

export default NewContact;
