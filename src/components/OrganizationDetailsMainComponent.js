import PreviousContributorInfo from "../components/PreviousContributorInfo";
import OrgContributors from "./OrgContributors";
import OrganizationsLinksAndStatus from "./OrganizationsLinksAndStatus";

import "./OrganizationDetailsMainComponent.css";

function OrganizationDetailsMainComponent({ details }) {
    let pastCompletedPojects = Object.keys(details.projects).map(key => {
        return {
            label: key,
            y: details.projects[key].length,
            year: key,
            completedProjects: details.projects[key],
        }
    });

    return (<div className="org-detail-main-comp">
        <div className="first-half ">
            <div className="org-image-name-desc">
                <img className="org-image-main" src={details.image_url} alt={details.name} style={{ backgroundColor: details.image_background_color }} />
                <div className="org-name-desc">
                    <p className="org-heading-name">
                        {details.name}
                    </p>
                    <p className="org-heading-desc">{details.description}</p>
                    <div className="org-category">
                        <p className="org-category-item org-first-category">{details.category[0]}</p>
                    </div>
                    {details.activeOrg ?
                        <div className="acitev-btn">
                            <div className="btn-active-inactive active-colors">
                                <div className="active circle"></div><div className='active-text'>Active</div>
                            </div>
                        </div> :
                        <div className="acitev-btn inactive-colors">
                            <div className="btn-active-inactive">
                                <div className="inactive circle"></div><div className='active-text'>Inactive</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="org-items">
                <p className="org-years-title">Years</p>
                <div className="org-years-item">
                    {details.year?.map((year, index) => {
                        return <p className="org-year-item" key={index}>{year}</p>
                    })}
                </div>
            </div>
            <div className="org-items">
                <p className="org-Technologies-title">Technologies</p>
                <div className="org-years-item">
                    {details.technologies?.map((value, index) => {
                        return <p className="org-Technologies-item" key={index}>{value}</p>
                    })}
                </div>
            </div>
            <div className="org-items">
                <p className="org-Technologies-title">Topics</p>
                <div className="org-years-item">
                    {details.topics?.map((value, index) => {
                        return <p className="org-Technologies-item" key={index}>{value}</p>
                    })}
                </div>
            </div>
        </div>
        <div className="sec-half ">
            {/* GRAPH */}
            <div style={{ marginBottom: "20px" }}>
                <PreviousContributorInfo pastCompletedPojects={pastCompletedPojects} />
            </div>
            {/* Organization Contributors */}
            <div className="OrgContributors">
                <OrgContributors contributorsDeatils={details.contributorsDetails} githubID={details.githubID}></OrgContributors>
            </div>
            {/* Social Media */}
            <div className="org-direct-contact-info">
                <p className="sub-component-heading">
                    Organization Contacts
                </p>
                <div className="social-media-icons">
                    <OrganizationsLinksAndStatus
                        activeStatus={details.activeOrg}
                        orgGithubID={details.githubID}
                        orgWebLink={details.url}
                        contactEmail={details.contact_email}
                        mailingList={details.mailing_list}
                    />
                </div>
            </div>
        </div>
    </div>);
}

export default OrganizationDetailsMainComponent;