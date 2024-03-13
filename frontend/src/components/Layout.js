import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import FooterComponent from "./footer-component";
import '../styles/background.css'

const Layout = () => {
  return (
    <>
      <div className="container">
        <Nav />
        <div className="container py-4 position-relative">
          <img className="position-absolute main-content" src="audio.png"></img>
          <div className="p-5 mb-4 bg-light rounded-3">
          <Outlet />
          </div>
        </div>
        <FooterComponent />
      </div>
      
    </>
  );
};

export default Layout;