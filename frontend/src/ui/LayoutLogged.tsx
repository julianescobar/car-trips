import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/NavBar";

export const LayoutLogged = () => {
  return (
    <>
      <Navbar />
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </>
  );
};
