import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PraisesList from "./pages/PraisesList";
import Praise from "./pages/Praise";
import PraisesListAdmin from "./pages/Admin/PraisesListAdmin";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import PraiseSettings from "./pages/Admin/PraiseSettings";
import ServicePraisesList from "./pages/ServicePraisesList";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PraisesList />} />
        <Route exact path="/praise" element={<Praise />} />
        <Route exact path="/login-admin" element={<LoginAdmin />} />
        <Route exact path="/praises-admin" element={<PraisesListAdmin />} />
        <Route exact path="/praise-settings" element={<PraiseSettings />} />
        <Route
          exact
          path="/service-praises-list"
          element={<ServicePraisesList />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
