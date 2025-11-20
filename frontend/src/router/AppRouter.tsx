import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import LoginPage from "../auth/pages/LoginPage";
import { CarsPage } from "../cars/pages/CarsPage";
import { TripsPage } from "../trips/pages/TripsPage";
import { LayoutLogged } from "../ui/LayoutLogged";
import { SearchTripsPage } from "../trips/pages/SearchTripPage";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loadingAuth } = useContext(AuthContext);
  if (loadingAuth) return null; 
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loadingAuth } = useContext(AuthContext);
  if (loadingAuth) return null;
  return isAuthenticated ? <Navigate to="/carros" /> : children;
};


export const AppRouter = () => {

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
