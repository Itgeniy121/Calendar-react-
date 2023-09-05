import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
