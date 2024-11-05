import React from "react";

export const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="bg-white p-6 rounded shadow-md">{children}</div>;
};
