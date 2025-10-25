import "./App.css";
import Home from "./pages/Home/Home";
import ThemeProviderWrapper from "./theme/ThemeProviderWrapper";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from "./pages/Signup/Signup";

function App() {
  return (
    <ThemeProviderWrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
           <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProviderWrapper>
  );
}

export default App;
