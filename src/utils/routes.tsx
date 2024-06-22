import Home from "@/app/page";
import Song from "../components/pages/Song";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function RoutesMcc() {
    return (
    <div>
      {/* <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/praise" element={<Song />} />
        </Routes>
      </BrowserRouter> */}
    </div>
    );
  }
  
  export default RoutesMcc;