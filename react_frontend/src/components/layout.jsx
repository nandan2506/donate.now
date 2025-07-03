
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./footer";

function Layout() {
  return (
    <>
    <NavBar/>
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default Layout;
