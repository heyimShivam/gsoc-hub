import { useState, useEffect } from "react";
import PastProjectDetailCard from "../components/PastProjectDetailCard";
import OrganizationDetailsMainComponent from "../components/OrganizationDetailsMainComponent";
import RepoDetailCard from "../components/RepoDetailCard";
import OrganizationDetailsShimmer from '../components/OrganizationDeatilsShimmer';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Footer from "../components/Footer";
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet";

import "./OrganizationDetails.css";
const OrganizationDetails = () => {
    const [orgReposDetail, setOrgReposDetail] = useState([]);
    const [orgDetails, setOrgDetails] = useState();
    const [pastProjectSelectedYear, setPastProjectSelectedYear] = useState(0);
    const [pastCompletedPojects, setPastCompletedPojects] = useState([{}]);
    const [githubInComponent, setGithubInComponent] = useState();
    const [orgNameInComponent, setOrgNameInComponent] = useState();
    const { urlOrgName, urlGithubID } = useParams();

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
        let data;
        try {
            data = await import(`../data/OrganizationsDetails(GSoC)/${cleanString(orgNameInComponent, githubInComponent)}.json`);
        } catch (error) {
            console.error("Page Not Found select vaild URL!");
            return;
        }

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
        if (!orgNameInComponent && !githubInComponent) {
            setOrgNameInComponent(decodeURIComponent(urlOrgName));
            setGithubInComponent(decodeURIComponent(urlGithubID));
        }
    }, [urlOrgName, urlGithubID]);

    useEffect(() => {
        if (orgNameInComponent && githubInComponent) {
            loadOrganizationData();
        }
    }, [orgNameInComponent, githubInComponent]);

    return (<>
        <Helmet>
            <title>{`${orgNameInComponent} – GSoC Organization | GSoC Hub`}</title>
            <meta name="title" content={`${orgNameInComponent} – GSoC Organization | GSoC Hub`} />

            <meta
                name="description"
                content={`Explore ${orgNameInComponent}, a Google Summer of Code organization. Discover past completed projects, repositories, tech stacks, and more.`}
            />

            <meta
                name="keywords"
                content={`Google Summer of Code ${orgNameInComponent}, gsoc ${orgNameInComponent}, ${orgNameInComponent} in gsoc, gsoc hub, ${orgNameInComponent} gsoc org, ${orgNameInComponent} gsoc projects, ${orgNameInComponent} gsoc repositories`}
            />

            <meta name="robots" content="index, follow" />

            <link
                rel="canonical"
                href={`https://www.gsochub.com/organization/${encodeURIComponent(orgNameInComponent)}/${encodeURIComponent(githubInComponent)}`}
            />

            {/* advertisment */}
            <meta name="google-adsense-account" content="ca-pub-8760620301329485"></meta>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8760620301329485"
                crossorigin="anonymous"></script>
        </Helmet>

        {orgDetails ?
            <div className="organization-details">
                <OrganizationDetailsMainComponent details={orgDetails} />
                {
                    pastCompletedPojects && pastCompletedPojects.length > 0 && pastProjectSelectedYear >= 0 ?
                        <div className="past-projects-component-main">
                            <h1 className="title">
                                Past projects accomplished under Google Summer of Code
                            </h1>
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
                                    return <p className={`org-year-card ${pastProjectSelectedYear === index ? 'acitveBgBtn' : 'inactiveBgBtn'}`} onClick={() => { setPastProjectSelectedYear(index) }} key={index}>{year}</p>
                                })}
                            </div>
                        </div>
                        : <></>
                }

                {orgReposDetail.length > 0 ?
                    <div className="organizations-all-repos">
                        <h1 className="title">
                            Organization Repositories
                        </h1>
                        <div className="inner-organizations-all-repo">
                            <div className="organizations-repos">
                                {
                                    orgReposDetail.slice(0, 9).map((value, index) => {
                                        return <RepoDetailCard key={value.id} githubID={githubInComponent} index={index} deatils={value} />
                                    })
                                }
                            </div>
                            {
                                orgReposDetail.length > 9 ? <div className="more-organizations-repos"><span className="btn-more-repos" onClick={() => { goToOrgRepo(githubInComponent) }}>+ More Repositories</span></div> : <></>
                            }
                        </div>
                    </div>
                    : <></>}
                <div className="up-arrow" onClick={scrollToTop}>
                    <ExpandLessIcon />
                </div>
                <Footer />
            </div>
            : <><OrganizationDetailsShimmer></OrganizationDetailsShimmer><Footer /></>
        }
    </>);
}

export default OrganizationDetails;
