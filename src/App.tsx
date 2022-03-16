import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
