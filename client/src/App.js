import "./App.css";
import Home from "./pages/Home/Home";
import ThemeProviderWrapper from "./theme/ThemeProviderWrapper";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./pages/Signup/Signup";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

function App() {
  return (
    <ThemeProviderWrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/reset-password/:userId/:token' element={<ResetPassword />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProviderWrapper>
  );
}

export default App;
