import { useEffect, useState, useContext } from "react";
import OrganizationContext from '../context/OrganizationContext';
import { filterByOrgName } from '../filter/filter';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import "./CompareOrgs.css";

const CompareOrgs = ({ mainOrgDetails }) => {
    const organizationContext = useContext(OrganizationContext);
    const [totalNoOfGSOCParticipantsMainOrgDetails, setTotalNoOfGSOCParticipantsMainOrgDetails] = useState(0);
    const [comparisonOrgName, setComparisonOrgName] = useState("");
    const [allOrganizationsList, setAllOrganizationsList] = useState(organizationContext.orgsData);
    const [comparisonOrgDeatils, setComparisonOrgDeatils] = useState();
    const [showCompareORgSelectionArea, setShowCompareORgSelectionArea] = useState(true);

    function filterComparisonOrgName(name) {
        setComparisonOrgName(name);
        const filterData = filterByOrgName(name.toLowerCase());
        setAllOrganizationsList(filterData);
    }

    function calculateGSoCProjects(data) {
        let totalProjectSelected = 0;

        Object.keys(data.projects).map((key) => {
            totalProjectSelected += data.projects[key].length;
        });

        return totalProjectSelected;
    }

    function cleanString(str, githubID) {
        return str.replace(/[^a-zA-Z0-9 ]/g, '') + `_${githubID || 'NA'}`;
    }

    async function updateComparisonOrg(orgName, orgGithubID) {
        const compareOrgData = await import(`../data/OrganizationsDetails(GSoC)/${cleanString(orgName, orgGithubID)}.json`);

        setComparisonOrgDeatils(compareOrgData.default);
        setShowCompareORgSelectionArea(!showCompareORgSelectionArea);
    }

    useEffect(() => {
        let temp = calculateGSoCProjects(mainOrgDetails);
        setTotalNoOfGSOCParticipantsMainOrgDetails(temp);
    }, []);


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

            {/* Comparison Org Data */}
            {
                !showCompareORgSelectionArea
                    ?
                    <div className="second-org-component content-component">
                        <div className="content-component-action-btns">
                            <div onClick={() => { setShowCompareORgSelectionArea(!showCompareORgSelectionArea) }}><ClearIcon style={{ cursor: 'pointer' }} /></div>
                        </div>
                        <div className="org-image-name-desc">
                            <img className="org-image-main" src={comparisonOrgDeatils.image_url} alt={comparisonOrgDeatils.name + 'GSoC Hub'} style={{ backgroundColor: comparisonOrgDeatils.image_background_color }} />
                            <div className="org-name-desc">
                                <h1 className="org-heading-name" style={{ paddingTop: '10px' }}>
                                    <Link className="compare-org-name" to={`/organization/${encodeURIComponent(comparisonOrgDeatils.name)}/${encodeURIComponent(comparisonOrgDeatils.githubID)}`} target="_blank" rel="noopener noreferrer" >
                                        {comparisonOrgDeatils.name}
                                    </Link>
                                </h1>
                                <p className="org-heading-desc">{comparisonOrgDeatils.description}</p>
                                <div className="org-category">
                                    <p className="org-category-item org-first-category">{comparisonOrgDeatils.category[0]}</p>
                                </div>
                                {comparisonOrgDeatils.activeOrg ?
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
                                <p className="details">{comparisonOrgDeatils.contributorsDetails.length} contributors. <span className="extra-text">(Based on Top 3 Active Repositories)</span></p>
                            </div>
                            <div className="comparison-factor">
                                <h2 className="h2-heading">Total number of Repositories</h2>
                                <p className="details">{comparisonOrgDeatils.repositories.length} repositories.</p>
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
                                        Object.keys(comparisonOrgDeatils.projects).map((key, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{key}</td>
                                                    <td>{comparisonOrgDeatils.projects[key].length}</td>
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
                                        comparisonOrgDeatils.technologies.map((tech, index) => {
                                            return (<div className="details-tech-item" key={index + tech}>{tech}</div>)
                                        })
                                    }
                                </div>
                            </div>
                            <div className="comparison-factor-btn">
                                <Link className="compare-org-name-goto-btn" to={`/organization/${encodeURIComponent(comparisonOrgDeatils.name)}/${encodeURIComponent(comparisonOrgDeatils.githubID)}`} target="_blank" rel="noopener noreferrer" >
                                    View Complete Info
                                </Link>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="second-org-component content-component" style={{ padding: '0px' }}>
                        <div className="second-org-component-search-area">
                            <input type="text" className="search-compare-org filters-search" placeholder="Search comparison organization here." value={comparisonOrgName} onChange={(value) => filterComparisonOrgName(value.target.value)} />
                            <SearchIcon className='search-icon-filter-nav' />
                        </div>

                        {
                            allOrganizationsList.map((value, index) => {
                                return (<div key={index + value.name} className="compare-org-items" onClick={() => { updateComparisonOrg(value.name, value.githubID) }}>
                                    {value.name}
                                </div>)
                            })
                        }
                    </div>
            }

        </div>
    </>)
}

export default CompareOrgs;