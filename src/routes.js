import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PraisesList from "./pages/PraisesList";
import Praise from "./pages/Praise";
import PraisesListAdmin from "./pages/PraisesListAdmin";
import LoginAdmin from "./pages/LoginAdmin";

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PraisesList />} />
        <Route exact path="/praise" element={<Praise />} />
        <Route exact path="/login-admin" element={<LoginAdmin />} />
        <Route exact path="/praises-admin" element={<PraisesListAdmin />} />
        {/* <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} /> */}
        {/* <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/recovery-password" element={<RecoveryPassword/>}/>
          <Route path="*" element={<NotFound/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
