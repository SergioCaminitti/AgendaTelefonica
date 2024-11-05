export {};

import React, { useState } from "react";

export const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  
  return (
    <form>
      <input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Telefone" value={number} onChange={(e) => setNumber(e.target.value)} />
      <button type="submit">Adicionar Contato</button>
    </form>
  );
};
