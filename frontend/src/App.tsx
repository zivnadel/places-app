import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainNav from "./components/nav/MainNav";
import NewPlace from "./pages/NewPlace";
import UserPlaces from "./pages/UserPlaces";
import Users from "./pages/Users";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainNav />
      <main className="mt-20">
        <Routes>
          <Route index element={<Users />} />
          <Route path="/:uid/places" element={<UserPlaces />} />
          <Route path="/places/new" element={<NewPlace />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
