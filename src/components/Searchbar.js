import React, { useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import "./Searchbar.css";
import { useState, useContext } from 'react';
import { filterByOrgName } from '../filter/filter';
import OrganizationContext from '../context/OrganizationContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Searchbar = ({ toggleSidebar }) => {
    const [orgName, setOrgName] = useState("");
    const organizationContext = useContext(OrganizationContext);
    const [debouncedOrgName, setDebouncedOrgName] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenuIcon, setShowMenuIcon] = useState(false);

    const filterOrgCall = (value) => {
        const filterData = filterByOrgName(value.toLowerCase());
        organizationContext.filterOrgs(filterData);

        if (location?.pathname !== '/organization')
            navigate("/organization");
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedOrgName(orgName.toLowerCase());
        }, 300);

        return () => clearTimeout(handler);
    }, [orgName]);


    useEffect(() => {
        filterOrgCall(debouncedOrgName);
    }, [debouncedOrgName]);

    const updateSearch = (value) => {
        setOrgName(value.toLowerCase());
    }

    useEffect(() => {
        if (location.pathname === '/organization') {
            setShowMenuIcon(true);
        } else {
            setShowMenuIcon(false);
        }
    }, [location]);

    return (<>
        <div className="search-bar">
            <input name="search-bar" type="text" placeholder="Search organization here." value={orgName} onChange={evt => updateSearch(evt.target.value)} />
            <div>
                <SearchIcon className='search-icon' />
            </div>
        </div>
        {
            showMenuIcon ? <div className='search-icon-mobile-comp'>
                <MenuIcon className='search-icon-mobile' fontSize="large" onClick={toggleSidebar} />
            </div> : <></>
        }
    </>)
}

export default Searchbar;