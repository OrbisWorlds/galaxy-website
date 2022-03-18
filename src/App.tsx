import * as React from "react";
import { Routes, Route } from "react-router-dom";
//pages
import Main from "./pages/main";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}
