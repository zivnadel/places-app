import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
