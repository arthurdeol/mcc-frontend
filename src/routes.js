import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import PraisesList from "./pages/PraisesList";
import Praise from "./pages/Praise";
import PraisesListAdmin from "./pages/Admin/PraisesListAdmin";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import RegisterAdmin from "./pages/Admin/RegisterAdmin";
import PraiseSettings from "./pages/Admin/PraiseSettings";
import MyPraisesList from "./pages/MyPraisesList";
import DisplaySentServiceList from "./pages/DisplaySentServiceList";
import AddPraise from "./pages/Admin/AddPraise";

function RoutesApp() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<PraisesList />} />
          <Route exact path="/praise/:id/:file" element={<Praise />} />
          <Route exact path="/my-praises-list" element={<MyPraisesList />} />
          <Route
            exact
            path="/shared-praises-list/:id"
            element={<DisplaySentServiceList />}
          />
          <Route exact path="/register-admin" element={<RegisterAdmin />} />
          <Route exact path="/login-admin" element={<LoginAdmin />} />
          <Route
            exact
            path="/praises-admin"
            element={
              <PrivateRoute>
                <PraisesListAdmin />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/praise-settings"
            element={
              <PrivateRoute>
                <PraiseSettings />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/add-praise"
            element={
              <PrivateRoute>
                <AddPraise />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default RoutesApp;
