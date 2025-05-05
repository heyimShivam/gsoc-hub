import { useContext, useEffect, useState } from "react";
import "./HomeOrganization.css";
import OrganizationInfoCard from "./OrganizationInfoCard";
import { useNavigate } from "react-router-dom";
import OrganizationContext from "../context/OrganizationContext";

const HomeOrganization = () => {
    const orgContext = useContext(OrganizationContext);
    const navigate = useNavigate();
    const [noOfOrgsInHomePage, setNoOfOrgsInHomePage] = useState(3);
    const viewAllorganization = () => {
        navigate("/organization");
    }
    const handleResize = () => {
        const cardWidth = 320 + 16;
        const componentWidth = orgDisplayComponent.clientWidth;
        setNoOfOrgsInHomePage(Math.floor(componentWidth / cardWidth));
    };
    let orgDisplayComponent;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        orgDisplayComponent = document.getElementById("org-component");
        handleResize();
        orgDisplayComponent.addEventListener('resize', handleResize);

        return () => {
            orgDisplayComponent.removeEventListener('resize', handleResize);
        };
    }, []);
    return (<div className="home-org-component component">
        <div className="component-heading">Organizations</div>
        <div className="orgs-preview orgs-preview-component-background" id="org-component">
            <div className="orgs-info-cards">
                {
                    orgContext.orgsData.slice(18, 18 + noOfOrgsInHomePage).map((value, index) => {
                        return <OrganizationInfoCard key={index} {...value} />
                    })
                }
            </div>
            <div className="center-view-more">
                <span className="view-more-organization" onClick={() => { viewAllorganization() }}>
                    View More
                </span>
            </div>
        </div>
    </div>)
}

export default HomeOrganization;