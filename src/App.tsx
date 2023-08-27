import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { useState } from "react";
import PanelPage from "./pages/PanelPage";
import CalendarPage from "./pages/CalendarPage";
function App() {
  const [task, setTask] = useState<string>("");
  const handler = (value: string) => {
    setTask(value);
  };
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/panel' element={<PanelPage task={task} />} />
        <Route path='/calendar' element={<CalendarPage sendTask={handler} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
