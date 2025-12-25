import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import CarsPage from "./pages/CarsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Layout from "./components/Layout.jsx";
import CarPageDetails from "./pages/CarPageDetails.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { apiRefreshUser } from "./redux/auth/operations.js";

function App() {

const dispatsh = useDispatch()  

useEffect(() => {
  dispatsh(apiRefreshUser())
}, [dispatsh])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/:id" element={<CarPageDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
