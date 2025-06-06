// RoutesConfig.jsx
import React from "react";
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import LogIn from './pages/LogIn/Login.jsx';
import SignUp from './pages/SignUp/Signup.jsx';
import LandingPage from './pages/LandingPage/LandingPage.jsx'
import LayOut from "./components/LayOut/LayOut.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx"
import EmailForPassword from "./pages/EmailForPassword/EmailForPassword.jsx";
import PasswordUpdater from "./pages/PassWordUpdator/PassWordUpdator.jsx"
import ChemicalDetailsPage from "./pages/DetailsPage/ChemcialDeatils.jsx"
const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/logIn" element={<LayOut><LogIn /> </LayOut>} />
      <Route path="/SignUp" element={<LayOut><SignUp /> </LayOut>} />
      <Route path="/" element={<LogIn />} />
      {/* email password updator */}
      <Route path="/passwordConfirm/:iv/:content" element={<LayOut><PasswordUpdater /></LayOut>} />
      <Route path="/chemicalDetails/:chemicalId" element={<LayOut><ChemicalDetailsPage /></LayOut>} />
      <Route path="/emailForPassword" element={<LayOut><EmailForPassword /></LayOut>} />
      {/* ----------------- */}
      <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<LayOut> <LandingPage /> </LayOut>} />
      </Route>



      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
