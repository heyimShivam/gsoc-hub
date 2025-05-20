import { useEffect, useState } from "react";
import "./CompareOrgs.css";

const CompareOrgs = ({ mainOrgDetails }) => {
    console.log(mainOrgDetails);
    const [totalNoOfGSOCParticipantsMainOrgDetails, setTotalNoOfGSOCParticipantsMainOrgDetails] = useState(0);


    function calculateGSoCProjects(data) {
        let totalProjectSelected = 0;

        Object.keys(data.projects).map((key) => {
            totalProjectSelected += data.projects[key].length;
        });

        return totalProjectSelected;
    }

    useEffect(() => {
        let temp = calculateGSoCProjects(mainOrgDetails);
        setTotalNoOfGSOCParticipantsMainOrgDetails(temp);
    }, []);

    const comparisonOrgDeatils = mainOrgDetails;

    return (<>
        <h1 className="title">
            Compare Organizations
        </h1>
        <div className="compare-orgs-component">
            <div className="first-org-component content-component">
                <div className="org-image-name-desc">
                    <img className="org-image-main" src={mainOrgDetails.image_url} alt={mainOrgDetails.name + 'GSoC Hub'} style={{ backgroundColor: mainOrgDetails.image_background_color }} />
                    <div className="org-name-desc">
                        <h1 className="org-heading-name" style={{ paddingTop: '10px' }}>
                            {mainOrgDetails.name}
                        </h1>
                        <p className="org-heading-desc">{mainOrgDetails.description}</p>
                        <div className="org-category">
                            <p className="org-category-item org-first-category">{mainOrgDetails.category[0]}</p>
                        </div>
                        {mainOrgDetails.activeOrg ?
                            <div className="acitev-btn active-colors">
                                <div className="btn-active-inactive">
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
                <div className="Other-deatails">
                    <div className="comparison-factor">
                        <h2 className="h2-heading">Total number of Contributors</h2>
                        <p className="details">{mainOrgDetails.contributorsDetails.length} contributors. <span className="extra-text">(Based on Top 3 Active Repositories)</span></p>
                    </div>
                    <div className="comparison-factor">
                        <h2 className="h2-heading">Total number of Repositories</h2>
                        <p className="details">{mainOrgDetails.repositories.length} repositories.</p>
                    </div>
                    <div className="comparison-factor">
                        <h2 className="h2-heading">Total number of contributors selected in previous Google Summer of Code</h2>
                        <p className="details">{totalNoOfGSOCParticipantsMainOrgDetails} contributors.</p>
                        <table className="details-table">
                            <tr>
                                <th>Year</th>
                                <th>No of completed Projects</th>
                            </tr>
                            {
                                Object.keys(mainOrgDetails.projects).map((key, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{key}</td>
                                            <td>{mainOrgDetails.projects[key].length}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                    <div className="comparison-factor">
                        <h2 className="h2-heading">Technologies</h2>
                        <div className="technologies-details">
                            {
                                mainOrgDetails.technologies.map((tech, index) => {
                                    return (<div className="details-tech-item" key={index + tech}>{tech}</div>)
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="second-org-component content-component">
                second
            </div>
        </div>
    </>)
}

export default CompareOrgs;