export const logDeletion = async (contactName: string) => {
  const message = `Contato excluído: ${contactName}`;
  
  try {
    await fetch("http://localhost:5000/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  } catch (error) {
    console.error("Erro ao enviar log:", error);
  }
};