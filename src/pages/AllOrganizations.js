import OrganizationInfoCard from "../components/OrganizationInfoCard";
import { useContext, useEffect, useState } from "react";
import OrganizationContext from "../context/OrganizationContext";
import Pagination from '@mui/material/Pagination';
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

    const [perPage, setPerPage] = useState(25);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);

    const getData = (current, pageSize) => {
        return orgsData.slice((current - 1) * pageSize, current * pageSize);
    };

    let widthofOrganizationComponent;

    const handleResize = () => {
        const cardWidth = document.getElementsByClassName("organization-cards")[0].clientWidth;
        const componentWidth = widthofOrganizationComponent.clientWidth;
        console.log(cardWidth);
        console.log(componentWidth);
        console.log(Math.floor((componentWidth / cardWidth)));
        let sub = (3 * Math.floor(componentWidth / cardWidth));
        setPerPage(sub);
        setSize(perPage);
    };

    useEffect(() => {
        setOrgsData([...orgContext.filteredOrgsData]);
        setCurrent(1);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        widthofOrganizationComponent = document.getElementById("all-organizations-component");
        handleResize();
        widthofOrganizationComponent.addEventListener('resize', handleResize);

        return () => {
            widthofOrganizationComponent.removeEventListener('resize', handleResize);
        };
    }, [orgContext.filteredOrgsData]);

    return (
        <div className="all-orgs">
            <FilterNav />
            <div className="total-orgs-number">
                <p className="total-orgs-text">Found {orgsData.length} organizations.</p>
            </div>

            <div className="all-organizations-component" id="all-organizations-component">
                {
                    getData(current, size).map((value, index) => {
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
                    page={current}
                    onChange={(event, value) => { setCurrent(value) }}
                />
            </div>

            <div className="up-arrow" onClick={scrollToTop}>
                <ExpandLessIcon />
            </div>
        </div>
    );
}

export default AllOrganizations;
