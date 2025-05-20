import OrganizationInfoCard from "../components/OrganizationInfoCard";
import { useContext, useEffect, useState } from "react";
import OrganizationContext from "../context/OrganizationContext";
import Pagination from '@mui/material/Pagination';
import "./AllOrganizations.css";
import FilterNav from "../components/filterNav";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Helmet } from "react-helmet";

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

    const [perPage, setPerPage] = useState(25);
    const [size, setSize] = useState(perPage);

    const getData = (current, pageSize) => {
        return orgsData.slice((current - 1) * pageSize, current * pageSize);
    };

    let widthofOrganizationComponent;

    const handleResize = () => {
        const cardWidth = document.getElementsByClassName("organization-cards")[0]?.clientWidth || 1;
        const componentWidth = widthofOrganizationComponent?.clientWidth;

        // This code help us to create only three completely filled rows in the pagination.
        let sub = (3 * Math.floor(componentWidth / cardWidth));
        setPerPage(sub);
        setSize(perPage);
    };

    useEffect(() => {
        setOrgsData([...orgContext.filteredOrgsData]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        widthofOrganizationComponent = document.getElementById("all-organizations-component");
        handleResize();
        widthofOrganizationComponent.addEventListener('resize', handleResize);

        return () => {
            widthofOrganizationComponent.removeEventListener('resize', handleResize);
        };
    }, [orgContext.filteredOrgsData]);

    return (
        <>
            <Helmet>
                <title>{`All GSoC organization | GSoC Hub`}</title>
                <meta name="title" content={`All GSoC Organization | GSoC Hub`} />

                <meta
                    name="description"
                    content={`Explore all Google Summer of Code (GSoC) organizations and easily filter them by tech stack, active years, status (active or inactive), topics, and more to find the perfect fit for your open source contribution goals.`}
                />
                <meta
                    name="keywords"
                    content={`Google Summer of Code, GSoC,  GSoc all organizations, gsoc organizations in year , gsoc hub, gsoc org explorer`}
                />

                <meta name="robots" content="index, follow" />

                <link
                    rel="canonical"
                    href={`https://www.gsochub.com/organization/`}
                />

                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={`https://www.gsochub.com/organization/`}
                />
                <meta property="og:title" content={`All GSoC organization | GSoC Hub`} />
                <meta
                    property="og:description"
                    content={`Explore all Google Summer of Code (GSoC) organizations and easily filter them by tech stack, active years, status (active or inactive), topics, and more to find the perfect fit for your open source contribution goals.`}
                />
                <meta property="og:image" content="https://www.gsochub.com/og-image.png" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:url"
                    content={`https://www.gsochub.com/organization/`}
                />
                <meta name="twitter:title" content={`All GSoC organization | GSoC Hub`} />
                <meta
                    name="twitter:description"
                    content={`Explore all Google Summer of Code (GSoC) organizations and easily filter them by tech stack, active years, status (active or inactive), topics, and more to find the perfect fit for your open source contribution goals.`}
                />
                <meta name="twitter:image" content="https://www.gsochub.com/og-image.png" />

                {/* advertisment */}
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8760620301329485"
                    crossorigin="anonymous"></script>
            </Helmet>

            <div className="all-orgs">
                <FilterNav />
                <div className="total-orgs-number">
                    <p className="total-orgs-text">Found {orgsData.length} organizations.</p>
                </div>

                <div className="all-organizations-component" id="all-organizations-component">
                    {
                        getData(orgContext.currenPageInAllOrgsPagination, size).map((value, index) => {
                            return <div className="organization-cards" key={index} >
                                <OrganizationInfoCard {...value} />
                            </div>
                        })
                    }
                </div>

                <div className="table-filter-info">
                    <Pagination
                        className="pagination-data"
                        count={Math.ceil(orgsData.length / size)}
                        page={orgContext.currenPageInAllOrgsPagination}
                        siblingCount={3}
                        boundaryCount={1}
                        onChange={(event, value) => { orgContext.updateCurrenPageInAllOrgsPagination(value) }}
                    />
                </div>

                <div className="up-arrow" onClick={scrollToTop}>
                    <ExpandLessIcon />
                </div>
            </div>
        </>
    );
}

export default AllOrganizations;
