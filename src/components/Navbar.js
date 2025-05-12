import "./Navbar.css";
import { useContext, useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import { useNavigate } from "react-router-dom";
import OrganizationContext from "../context/OrganizationContext";

const Navbar = () => {
    const navigate = useNavigate();
    const orgContext = useContext(OrganizationContext);
    const [scrolled, setScrolled] = useState(false);
    const toggleSidebar = () => {
        orgContext.updateOpenMobileNav();
    };

    const goToHomePage = () => {
        navigate("/");
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (<>
        <div className={`navbar-component ${scrolled ? "back-color" : ""}`}>
            <div className="float-class title text-color" style={{ cursor: 'pointer' }} onClick={goToHomePage}>
                GSoC HUB
            </div>
            <div className="float-class search-bar-component " style={{ float: "right" }}>
                <Searchbar toggleSidebar={toggleSidebar} />
            </div>
        </div>
    </>)
}

export default Navbar;