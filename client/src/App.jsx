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
import RestrictedRoute from "./components/RestrictedRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PractPage from "./pages/PractPage.jsx";

function App() {

const dispatsh = useDispatch()  

useEffect(() => {
  dispatsh(apiRefreshUser())
}, [dispatsh])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<RestrictedRoute><LoginPage /></RestrictedRoute>} />
        <Route path="/register" element={<RestrictedRoute><RegisterPage /></RestrictedRoute>} />
        <Route path="/cars" element={<PrivateRoute><CarsPage /> </PrivateRoute>} />
        <Route path="/cars/:id" element={<PrivateRoute><CarPageDetails /> </PrivateRoute>} />
        <Route path="/contacts" element={<PrivateRoute><ContactsPage /> </PrivateRoute>} />
        <Route path="/prac" element={<PrivateRoute><PractPage /> </PrivateRoute>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
