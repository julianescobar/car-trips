// AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import LoginPage from "../auth/pages/LoginPage";
import { CarsPage } from "../cars/pages/CarsPage";
import { TripsPage } from "../trips/pages/TripsPage";
import { LayoutLogged } from "../ui/LayoutLogged";
import { SearchTripsPage } from "../trips/pages/SearchTripPage";


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};


const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Navigate to="/cars" /> : children;
};

export const AppRouter = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    if (!access || !refresh) {
      logout();
    }
  }, [logout]);

  return (
    <Routes>

      
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      
      <Route element={<LayoutLogged />}>
      
        <Route
          path="/carros"
          element={
            <PrivateRoute>
              <CarsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/viajes"
          element={
            <PrivateRoute>
              <TripsPage />
            </PrivateRoute>
          }
        />

         <Route
          path="/buscar-carro"
          element={
            <PrivateRoute>
              <SearchTripsPage />
            </PrivateRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/carros" />} />

      </Route>

    </Routes>
  );
};
