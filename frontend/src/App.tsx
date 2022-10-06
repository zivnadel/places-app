import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainNav from "./components/nav/MainNav";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import useAuth from "./hooks/useAuth";
import Users from "./pages/Users";
import AuthContext from "./store/AuthContext";

const NewPlace = React.lazy(() => import("./pages/NewPlace"));
const UpdatePlace = React.lazy(() => import("./pages/UpdatePlace"));
const UserPlaces = React.lazy(() => import("./pages/UserPlaces"));
const Auth = React.lazy(() => import("./pages/Auth"));

const App: React.FC = () => {
  const { token, authContext } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:uid/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:pid" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:uid/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authContext}>
        <MainNav />
        <main className="mt-20">
          <React.Suspense fallback={<LoadingSpinner asOverlay />}>
            {routes}
          </React.Suspense>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
