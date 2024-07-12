import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter, Switch, Route } from "react-router-dom"; // alguns pacotes, no typescript, não vem com as informações necessarias que o TS precisa pra entender oq tem dentro dele, o erro q da informa oq precisa ser feito. Nesse caso precisei instalar @types com o yarn = @types/react-router-dom -D

import PraisesList from "./pages/PraisesList";
import Praise from "./pages/Praise";
// import Landing from "./pages/Landing";
// import OrphanagesMap from "./pages/OrphanagesMap";
// import Orphanage from "./pages/Orphanage";
// import CreateOrphanage from "./pages/CreateOrphanage";

// exact vai comparar os caminhos para que não mostre tela landing junto com as outras, geralmente só usada na primeira rota mesmo

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PraisesList />} />
        <Route exact path="/praise" element={<Praise />} />
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
