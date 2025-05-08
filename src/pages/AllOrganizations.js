import OrganizationInfoCard from "../components/OrganizationInfoCard";
import { useContext, useEffect, useState } from "react";
import OrganizationContext from "../context/OrganizationContext";
import "./AllOrganizations.css";
import FilterNav from "../components/filterNav";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const AllOrganizations = () => {
    const orgContext = useContext(OrganizationContext);
    const [orgsData, setOrgsData] = useState([...orgContext.filteredOrgsData]);
    const scrollToTop = () => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        setOrgsData([...orgContext.filteredOrgsData]);
        console.log(orgContext.filteredOrgsData);
        console.log(orgsData);
    }, [
        orgContext.filteredOrgsData
    ]);
    return (
        <div className="all-orgs">
            <FilterNav />
            <div className="total-orgs-number">
                <p className="total-orgs-text">{orgsData.length} results</p>
            </div>
            <div className="all-organizations-component">
                {
                    orgsData.map((value, index) => {
                        return <div className="organization-cards" key={index} >
                            <OrganizationInfoCard {...value} />
                        </div>
                    })
                }
            </div>
            <div className="up-arrow" onClick={scrollToTop}>
                <ExpandLessIcon />
            </div>
        </div>
    );
}

export default AllOrganizations;
