import "./Navbar.css";
import { useContext } from "react";
import Searchbar from "./Searchbar";
import OrganizationContext from "../context/OrganizationContext";
const Navbar = () => {
    const orgContext = useContext(OrganizationContext);

    const toggleSidebar = () => {
        orgContext.updateOpenMobileNav();
    };

    return (<>
        <div className="navbar-component">
            <div className="float-class title text-color">
                GSoC HUB
            </div>
            <div className="float-class search-bar-component " style={{ float: "right" }}>
                <Searchbar toggleSidebar={toggleSidebar} />
            </div>
        </div>
    </>)
}

export default Navbar;