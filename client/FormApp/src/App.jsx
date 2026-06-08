import { BrowserRouter, Routes, Route } from "react-router-dom";

import FormPage from "./pages/FormPage";
import AdminCreateForm from "./pages/AdminCreateForm";
import AdminDashBoard from "./pages/AdminDashBoard";
import ResponseViewer from "./pages/ResponseViewer";
import Analytics from "./pages/Analytics";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>

      {/* Navbar always visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/form/:slug" element={<FormPage />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/admin/create" element={<AdminCreateForm />} />
        <Route path="/admin/responses/:formId" element={<ResponseViewer />} />
        <Route path="/admin/analytics/:formId" element={<Analytics />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;