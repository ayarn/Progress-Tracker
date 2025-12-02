import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import NotesPage from "./components/NotesPage";
import PDFViewer from "./components/PDFViewer";

const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/notes" element={<NotesPage />} />
      <Route path="/notes/view/:file" element={<PDFViewer />} />
    </Routes>
  </Router>
);

export default Root;
