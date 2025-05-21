import OrganizationInfoCard from "../components/OrganizationInfoCard";
import { useContext, useEffect, useState } from "react";
import OrganizationContext from "../context/OrganizationContext";
import Pagination from '@mui/material/Pagination';
import "./AllOrganizations.css";
import FilterNav from "../components/filterNav";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Helmet } from "react-helmet";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

const AllOrganizations = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [canonicalUrl, setCanonicalUrl] = useState('https://www.gsochub.com/organization');
    const orgContext = useContext(OrganizationContext);
    const [orgsData, setOrgsData] = useState([...orgContext.filteredOrgsData]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const scrollToTop = () => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }

    const [perPage, setPerPage] = useState(24);
    const [size, setSize] = useState(perPage);

    const getData = (current, pageSize) => {
        return orgsData.slice((current - 1) * pageSize, current * pageSize);
    };

    const updatePage = (value) => {
        if (value === 1) {
            setSearchParams();
            setCurrentPage(1);
        } else {
            setSearchParams({ page: value });
        }
        scrollToTop();
    }

    useEffect(() => {
        setOrgsData([...orgContext.filteredOrgsData]);
    }, [orgContext.filteredOrgsData]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get("page"), 10);
        const totalPages = Math.ceil(orgsData.length / size);

        const isValidPage = !isNaN(page) && page >= 1 && page <= totalPages;

        const canonical = (!isValidPage || page === 1)
            ? `https://www.gsochub.com${location.pathname}`
            : `https://www.gsochub.com${location.pathname}?page=${page}`;
        setCanonicalUrl(canonical);

        if (!isValidPage || page === 1) {
            // this will replace the old entry with new entry so that user does not need to press back button twice.
            navigate(location.pathname, { replace: true });
        }

        if (isValidPage && !isNaN(page)) {
            setCurrentPage(page);
        } else {
            setCurrentPage(1);
        }
    }, [location.pathname, location.search, orgsData.length, size]);

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
                    href={canonicalUrl}
                />

                {currentPage > 1 && (
                    <link
                        rel="prev"
                        href={`https://www.gsochub.com${location.pathname}?page=${currentPage - 1}`}
                    />
                )}
                {currentPage < Math.ceil(orgsData.length / size) && (
                    <link
                        rel="next"
                        href={`https://www.gsochub.com${location.pathname}?page=${currentPage + 1}`}
                    />
                )}

                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content={`https://www.gsochub.com/organization`}
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
                    content={`https://www.gsochub.com/organization`}
                />
                <meta name="twitter:title" content={`All GSoC organization | GSoC Hub`} />
                <meta
                    name="twitter:description"
                    content={`Explore all Google Summer of Code (GSoC) organizations and easily filter them by tech stack, active years, status (active or inactive), topics, and more to find the perfect fit for your open source contribution goals.`}
                />
                <meta name="twitter:image" content="https://www.gsochub.com/og-image.png" />

                {/* advertisment */}
                <meta name="google-adsense-account" content="ca-pub-8760620301329485"></meta>
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
                        getData(currentPage, size).map((value, index) => {
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
                        page={currentPage}
                        siblingCount={3}
                        boundaryCount={1}
                        onChange={(event, value) => { updatePage(value) }}
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
