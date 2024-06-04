import React from "react";
import { Route, Routes } from "react-router-dom";
import "./index.css";

import { HomePage } from "./pages/ListEntity/index";
import { UserPage } from "./pages/UserEntity";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./pages/Login/index";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="user/:id" element={<UserPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
