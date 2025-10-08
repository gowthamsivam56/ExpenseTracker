import "./App.css";
import Home from "./pages/Home/Home";
import ThemeProviderWrapper from "./theme/ThemeProviderWrapper";

function App() {
  return (
    <ThemeProviderWrapper>
      <Home />
    </ThemeProviderWrapper>
  );
}

export default App;
