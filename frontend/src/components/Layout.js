import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import FooterComponent from "./footer-component";

const Layout = () => {
  return (
    <>
      <div class="container">
        <Nav />
        <Outlet />
        <FooterComponent />
      </div>
      
    </>
  );
};

export default Layout;