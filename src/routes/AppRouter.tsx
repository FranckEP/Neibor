import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
