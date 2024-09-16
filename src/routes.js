import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PraisesList from "./pages/PraisesList";
import Praise from "./pages/Praise";
import PraisesListAdmin from "./pages/Admin/PraisesListAdmin";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import PraiseSettings from "./pages/Admin/PraiseSettings";
import MyPraisesList from "./pages/MyPraisesList";
import DisplaySentServiceList from "./pages/DisplaySentServiceList";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PraisesList />} />
        <Route exact path="/praise/:id/:file" element={<Praise />} />
        <Route exact path="/login-admin" element={<LoginAdmin />} />
        <Route exact path="/praises-admin" element={<PraisesListAdmin />} />
        <Route exact path="/praise-settings" element={<PraiseSettings />} />
        <Route exact path="/my-praises-list" element={<MyPraisesList />} />
        <Route
          exact
          path="/shared-praises-list/:id"
          element={<DisplaySentServiceList />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
