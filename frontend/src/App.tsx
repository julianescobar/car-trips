import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthContext";
import { AppRouter } from "./router/AppRouter";
import './App.css';

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
};

