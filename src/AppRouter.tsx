import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import NewContact from "./pages/NewContact";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/new" element={<NewContact />} />
    <Route path="/edit/:id" element={<NewContact />} />
  </Routes>
);

export default AppRouter;
