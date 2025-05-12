import { useState, useEffect } from "react";
import PastProjectDetailCard from "../components/PastProjectDetailCard";
import OrganizationDetailsMainComponent from "../components/OrganizationDetailsMainComponent";
import RepoDetailCard from "../components/RepoDetailCard";
import OrganizationDetailsShimmer from '../components/OrganizationDeatilsShimmer';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Footer from "../components/Footer";

import "./OrganizationDetails.css";
const OrganizationDetails = ({ orgName, githubIDpassed }) => {
    const [orgReposDetail, setOrgReposDetail] = useState([]);
    const [orgDetails, setOrgDetails] = useState();
    const [pastProjectSelectedYear, setPastProjectSelectedYear] = useState(0);
    const [pastCompletedPojects, setPastCompletedPojects] = useState([{}]);

    const scrollToTop = () => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }

    function cleanString(str, githubID) {
        return str.replace(/[^a-zA-Z0-9 ]/g, '') + `_${githubID || 'NA'}`;
    }

    const loadOrganizationData = async () => {
        const data = await import(`../data/OrganizationsDetails(GSoC)/${cleanString(orgName, githubIDpassed)}.json`);

        setOrgDetails(data.default);
        setOrgReposDetail(data.default.repositories);
        setPastProjectSelectedYear(0);
        let completedPojects = Object.keys(data.default.projects).map(key => {
            return {
                label: key,
                y: data.default.projects[key].length,
                year: key,
                completedProjects: data.default.projects[key]
            }
        })

        setPastCompletedPojects(completedPojects);
    };

    function goToOrgRepo(githubID) {
        window.open(`https://github.com/orgs/${githubID}/repositories`, "_blank");
    }

    useEffect(() => {
        loadOrganizationData();
    }, []);

    return (<>
        {orgDetails ?
            <div className="organization-details">
                <OrganizationDetailsMainComponent details={orgDetails} />
                {
                    pastCompletedPojects && pastCompletedPojects.length > 0 && pastProjectSelectedYear >= 0 ?
                        <div className="past-projects-component-main">
                            <div className="title">
                                Past projects accomplished under Google Summer of Code
                            </div>
                            <div className="past-projects-component">
                                {
                                    pastCompletedPojects[pastProjectSelectedYear].completedProjects.map((value, index) => {
                                        return <PastProjectDetailCard key={index} projectDetails={value} projectNumber={index + 1} />
                                    })
                                }
                                {
                                    pastCompletedPojects[pastProjectSelectedYear].completedProjects.length === 0 ? <div style={{ textAlign: 'center' }}>No Completed Project</div> : <></>
                                }
                            </div>
                            <div className="projects-per-year">
                                {orgDetails.year.map((year, index) => {
                                    if (pastCompletedPojects[index].completedProjects.length === 0) return <div key={index}></div>
                                    return <p onClick={() => { setPastProjectSelectedYear(index) }} className="org-year-card" key={index} style={pastProjectSelectedYear === index ? { backgroundColor: "hsl(217 89% 61%)" } : { backgroundColor: "#333" }}>{year}</p>
                                })}
                            </div>
                        </div>
                        : <></>
                }

                {orgReposDetail.length > 0 ?
                    <div className="organizations-all-repos">
                        <div className="title">
                            Organization Repositories
                        </div>
                        <div className="inner-organizations-all-repo">
                            <div className="organizations-repos">
                                {
                                    orgReposDetail.slice(0, 9).map((value, index) => {
                                        return <RepoDetailCard key={value.id} githubID={githubIDpassed} index={index} deatils={value} />
                                    })
                                }
                            </div>
                            {
                                orgReposDetail.length > 9 ? <div className="more-organizations-repos"><span className="btn-more-repos" onClick={() => { goToOrgRepo(githubIDpassed) }}>+ More Repositories</span></div> : <></>
                            }
                        </div>
                    </div>
                    : <></>}
                <div className="up-arrow" onClick={scrollToTop}>
                    <ExpandLessIcon />
                </div>
                <Footer />
            </div>
            : <><OrganizationDetailsShimmer></OrganizationDetailsShimmer><Footer /></>}
    </>);
}

export default OrganizationDetails;
