import SearchIcon from '@mui/icons-material/Search';
import "./filterNav.css";
import { useContext, useState, useEffect } from "react";
import OrganizationContext from '../context/OrganizationContext';
import AdvanceFilterModal from "./AdvanceFilterModal";
import PickedFilters from "./pickedFilters";
import { useNavigate, useLocation } from 'react-router-dom';
import {
    filterByTopics,
    filterByTechnologies,
    filterByYear,
    filterByCategories
} from "../filter/filter";
import { filterByOrgName } from '../filter/filter';

const FilterNav = ({ mobileNav }) => {
    const orgContext = useContext(OrganizationContext);
    const [openShowMoreFilterModal, setOpenShowMoreFilterModal] = useState(false);
    const [topicSearchInput, setTopicSearchInput] = useState("");
    const [technologieSearchInput, setTechnologieSearchInput] = useState("");
    const [yearSearchInput, setYearSearchInput] = useState("");
    const [categorieSearchInput, setCategorieSearchInput] = useState("");
    const [modalNav, setModalNav] = useState("totalGsocYears");
    const [orgName, setOrgName] = useState("");
    const organizationContext = useContext(OrganizationContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [screenSizeSmall, setScreenSizeSmall] = useState(true);
    const updateSearch = (value) => {
        setOrgName(value.toLowerCase());

        const filterData = filterByOrgName(value.toLowerCase());

        organizationContext.filterOrgs(filterData);

        if (location?.pathname !== '/organization')
            navigate("/organization");
    }
    const lastYear = orgContext.totalGsocYears[orgContext.totalGsocYears.length - 1];
    const handleResize = () => {
        if (window.innerWidth < 1215) {
            setScreenSizeSmall(true);
        } else {
            setScreenSizeSmall(false);
        }
    };

    useEffect(() => {
        handleResize();

        orgContext.UpdateOrgsAccTOFilters();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [
        orgContext.selectedStatus,
        orgContext.selectedGsocYears,
        orgContext.selectedTotalTopics,
        orgContext.selectedTotalTechnologies,
        orgContext.selectedTotalcategories,
    ]);

    function resetInputs() {
        setTopicSearchInput('');
        filterTopics('');
        setTechnologieSearchInput('');
        filterTechnologies('');
        setYearSearchInput('');
        filterYear('');
        setCategorieSearchInput('');
        filterCategories('');
    }

    function handleOpenModal() {
        resetInputs();
        setOpenShowMoreFilterModal(true);
    }

    const handleCloseModal = () => {
        setOpenShowMoreFilterModal(false);
        resetInputs();
    }

    function selectYear(value) {
        // State Mutation Issue
        // Earlier we are directly modifying currData (which is orgContext.selectedGsocYears, orgContext.selectedTotalTechnologies, etc.)
        // instead of creating a new array.
        // React may not detect state updates when you mutate the array directly.
        // Fix: Create a new array before updating the state let currData = [...orgContext.selectedGsocYears];.

        let currData = [...orgContext.selectedGsocYears];
        let eleIndex = currData.indexOf(value.target.value);

        if (eleIndex !== -1) {
            currData.splice(eleIndex, 1);
        } else {
            currData.push(value.target.value);
        }

        orgContext.updateFilterData("selectedGsocYears", currData);
    }

    function selectStatus(value) {
        // State Mutation Issue
        // Earlier we are directly modifying currData (which is orgContext.selectedGsocYears, orgContext.selectedTotalTechnologies, etc.)
        // instead of creating a new array.
        // React may not detect state updates when you mutate the array directly.
        // Fix: Create a new array before updating the state let currData = [...orgContext.selectedGsocYears];.

        let currData = [...orgContext.selectedStatus];
        let eleIndex = currData.indexOf(value);

        if (eleIndex !== -1) {
            currData.splice(eleIndex, 1);
        } else {
            currData.push(value);
        }

        orgContext.updateFilterData("selectedStatus", currData);
    }

    function selectTechnologies(value) {
        // State Mutation Issue
        // Earlier we are directly modifying currData (which is orgContext.selectedGsocYears, orgContext.selectedTotalTechnologies, etc.)
        // instead of creating a new array.
        // React may not detect state updates when you mutate the array directly.
        // Fix: Create a new array before updating the state let currData = [...orgContext.selectedGsocYears];.

        let currData = [...orgContext.selectedTotalTechnologies];
        let eleIndex = currData.indexOf(value.target.value);

        if (eleIndex !== -1) {
            currData.splice(eleIndex, 1);
        } else {
            currData.push(value.target.value);
        }

        orgContext.updateFilterData("selectedTotalTechnologies", currData);
    }

    function selectCategories(value) {
        // State Mutation Issue
        // Earlier we are directly modifying currData (which is orgContext.selectedGsocYears, orgContext.selectedTotalTechnologies, etc.)
        // instead of creating a new array.
        // React may not detect state updates when you mutate the array directly.
        // Fix: Create a new array before updating the state let currData = [...orgContext.selectedGsocYears];.

        let currData = [...orgContext.selectedTotalcategories];
        let eleIndex = currData.indexOf(value.target.value);

        if (eleIndex !== -1) {
            currData.splice(eleIndex, 1);
        } else {
            currData.push(value.target.value);
        }

        orgContext.updateFilterData("selectedTotalcategories", currData);
    }

    function selectTopics(value) {
        // State Mutation Issue
        // Earlier we are directly modifying currData (which is orgContext.selectedGsocYears, orgContext.selectedTotalTechnologies, etc.)
        // instead of creating a new array.
        // React may not detect state updates when you mutate the array directly.
        // Fix: Create a new array before updating the state let currData = [...orgContext.selectedGsocYears];.

        let currData = [...orgContext.selectedTotalTopics];
        let eleIndex = currData.indexOf(value.target.value);

        if (eleIndex !== -1) {
            currData.splice(eleIndex, 1);
        } else {
            currData.push(value.target.value);
        }

        orgContext.updateFilterData("selectedTotalTopics", currData);
    }

    function showMorefilters(filterType) {
        if (openShowMoreFilterModal === true) return;

        if (filterType === "totalGsocYears")
            setModalNav("totalGsocYears");
        else if (filterType === "totalcategories")
            setModalNav("totalcategories");
        else if (filterType === "totalTechnologies")
            setModalNav("totalTechnologies");
        else if (filterType === "totalTopics")
            setModalNav("totalTopics");

        handleOpenModal();
    }

    function filterCategories(value) {
        setCategorieSearchInput(value);

        const filterData = filterByCategories(value);

        orgContext.updateSearchFilters("selectedTotalcategories", filterData);
    }

    function filterYear(value) {
        setYearSearchInput(value);

        const filterData = filterByYear(value);

        orgContext.updateSearchFilters("selectedGsocYears", filterData);

    }

    function filterTechnologies(value) {
        setTechnologieSearchInput(value);

        const filterData = filterByTechnologies(value);

        orgContext.updateSearchFilters("selectedTotalTechnologies", filterData);
    }

    function filterTopics(value) {
        setTopicSearchInput(value);

        const filterData = filterByTopics(value);

        orgContext.updateSearchFilters("selectedTotalTopics", filterData);
    }

    if (screenSizeSmall) return (<>
        {orgContext.openMobileNav ?
            <div className="sidebar">
                <div>
                    <div className="mobile-nav-headings">Search Organization Here</div>
                    <div className="fitler-search-div-mobile">
                        <input style={{ width: "90%" }} className="filters-search-mobile" type="text" placeholder="Search organization here." value={orgName} onChange={evt => updateSearch(evt.target.value)}></input>
                        <SearchIcon className='search-icon-filter-nav' />
                    </div>

                    <div className="filters-mobile-sec">
                        <div className='mobile-sidenav-filter'>
                            <div className="mobile-nav-headings">Years</div>
                            <div className="fitler-search-div-mobile">
                                <input style={{ width: "90%" }} className="filters-search-mobile" type="text" placeholder="Search year here." value={yearSearchInput} onChange={(value => filterYear(value.target.value))}></input>
                                <SearchIcon className='search-icon-filter-nav' />
                            </div>
                            <div className="checkbox" >
                                <input type="checkbox" style={{ transform: 'scale(1.3)' }} id="only-this-year" name="only-this-year" value={"-20"} onChange={selectYear} checked={orgContext.selectedGsocYears.indexOf("-20") !== -1}></input>
                                <label htmlFor='only-this-year'>Only in {lastYear}</label><br></br>
                            </div>
                            {
                                [...orgContext.totalGsocYears].reverse()?.slice(0, 8).map((year, index) =>
                                    <div className="checkbox" key={index}>
                                        <input type="checkbox" style={{ transform: 'scale(1.3)' }} id={year} name={year} value={year} onChange={selectYear} checked={orgContext.selectedGsocYears.indexOf(year.toString()) !== -1}></input>
                                        <label htmlFor={year}>{year}</label><br></br>
                                    </div>
                                )
                            }
                            {
                                orgContext.totalGsocYears?.length > 9 ? <div className="checkbox more-tag" style={{ cursor: 'pointer' }} onClick={() => showMorefilters("totalGsocYears")}>
                                    <div>+ More</div>
                                </div> : <></>
                            }
                        </div>
                    </div>


                    <div className="filters-mobile-sec">
                        <div className='mobile-sidenav-filter'>
                            <div className="mobile-nav-headings">Categories</div>
                            <div className="fitler-search-div-mobile">
                                <input style={{ width: "90%" }} className="filters-search-mobile" type="text" placeholder="Search categorie here." value={categorieSearchInput} onChange={(value) => filterCategories(value.target.value)}></input>
                                <SearchIcon className='search-icon-filter-nav' />
                            </div>
                            {
                                orgContext.totalcategories?.slice(0, 9).map((categorie, index) =>
                                    <div className="checkbox" key={index}>
                                        <input type="checkbox" style={{ transform: 'scale(1.3)' }} id={categorie} name={categorie} value={categorie} onChange={selectCategories} checked={orgContext.selectedTotalcategories.indexOf(categorie) !== -1}></input>
                                        <label htmlFor={categorie}>{categorie}</label><br></br>
                                    </div>
                                )
                            }
                            {
                                orgContext.totalcategories?.length > 9 ? <div className="checkbox more-tag" style={{ cursor: 'pointer' }} onClick={() => showMorefilters("totalcategories")}>
                                    <div>+ More</div>
                                </div> : <></>
                            }
                        </div>
                    </div>

                    <div className="filters-mobile-sec">
                        <div className='mobile-sidenav-filter'>
                            <div className="mobile-nav-headings">Technologies</div>
                            <div className="fitler-search-div-mobile">
                                <input style={{ width: "90%" }} className="filters-search-mobile" type="text" value={technologieSearchInput} placeholder="Search Technologie here." onChange={(value) => filterTechnologies(value.target.value)}></input>
                                <SearchIcon className='search-icon-filter-nav' />
                            </div>
                            {
                                orgContext.totalTechnologies?.slice(0, 9).map((technologie, index) =>
                                    <div className="checkbox" key={index}>
                                        <input type="checkbox" style={{ transform: 'scale(1.3)' }} id={technologie} name={technologie} value={technologie} onChange={selectTechnologies} checked={orgContext.selectedTotalTechnologies.indexOf(technologie) !== -1}></input>
                                        <label htmlFor={technologie}>{technologie}</label><br></br>
                                    </div>
                                )
                            }
                            {
                                orgContext.totalTechnologies?.length > 9 ? <div className="checkbox more-tag" style={{ cursor: 'pointer' }} onClick={() => showMorefilters("totalTechnologies")}>
                                    <div>+ More</div>
                                </div> : <></>
                            }
                        </div>
                    </div>

                    <div className="filters-mobile-sec">
                        <div className='mobile-sidenav-filter'>
                            <div className="mobile-nav-headings">Topics</div>
                            <div className="fitler-search-div-mobile">
                                <input style={{ width: "90%" }} className="filters-search-mobile" type="text" placeholder="Search Topic here." value={topicSearchInput} onChange={(value) => filterTopics(value.target.value)}></input>
                                <SearchIcon className='search-icon-filter-nav' />
                            </div>
                            {
                                orgContext.totalTopics?.slice(0, 9).map((topic, index) =>
                                    <div className="checkbox" key={index}>
                                        <input type="checkbox" style={{ transform: 'scale(1.3)' }} id={topic} name={topic} value={topic} onChange={selectTopics} checked={orgContext.selectedTotalTopics.indexOf(topic) !== -1}></input>
                                        <label htmlFor={topic}>{topic}</label><br></br>
                                    </div>
                                )
                            }
                            {
                                orgContext.totalTopics?.length > 9 ? <div className="checkbox more-tag" style={{ cursor: 'pointer' }} onClick={() => showMorefilters("totalTopics")}>
                                    <div>+ More</div>
                                </div> : <></>
                            }
                        </div>
                    </div>
                </div>
            </div >
            : <></>}
        {/* Advance Filter Modal */}
        {
            openShowMoreFilterModal ? <AdvanceFilterModal activePage={modalNav} handleCloseModal={handleCloseModal} selectCategories={selectCategories} selectStatus={selectStatus} selectYear={selectYear} selectTechnologies={selectTechnologies} selectTopics={selectTopics} /> : <></>
        }

        <div className="picked-filters">
            <PickedFilters selectYear={selectYear} selectCategories={selectCategories} selectTechnologies={selectTechnologies} selectTopics={selectTopics} selectStatus={selectStatus} />
        </div>
    </>);
    else return (<>
        <div className="filters">
            <div className="filters-options">
                <div className="dropdown">
                    <button className="dropbtn">Year</button>
                    <div className="dropdown-content">
                        <div className="fitler-search-div">
                            <input className="filters-search" type="text" placeholder="Search year here." value={yearSearchInput} onChange={(value => filterYear(value.target.value))}></input>
                            <SearchIcon className='search-icon-filter-nav' />
                        </div>
                        {yearSearchInput === '' ? <div className="checkbox" >
                            <input type="checkbox" style={{ transform: 'scale(1.3)' }} id="only-this-year" name="only-this-year" value={"-20"} onChange={selectYear} checked={orgContext.selectedGsocYears.indexOf("-20") !== -1}></input>
                            <label htmlFor='only-this-year'>Only in {lastYear}</label><br></br>
                        </div> : <></>}
                        {
                            [...orgContext.totalGsocYears].reverse()?.slice(0, 8).map((year, index) =>
                                <div className="checkbox" key={index}>
                                    <input type="checkbox" style={{ transform: 'scale(1.3)' }} id={year} name={year} value={year} onChange={selectYear} checked={orgContext.selectedGsocYears.indexOf(year.toString()) !== -1}></input>
                                    <label htmlFor={year}>{year}</label><br></br>
                                </div>
                            )
                        }
                        {
                            orgContext.totalGsocYears?.length > 9 ? <div className="checkbox more-tag" style={{ cursor: 'pointer' }} onClick={() => showMorefilters("totalGsocYears")}>
                                <div>+ More</div>
                            </div> : <></>
                        }
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">Categories</button>
                    <div className="dropdown-content">
                        <div className="fitler-search-div">
                            <input className="filters-search" type="text" placeholder="Search categorie here." value={categorieSearchInput} onChange={(value) => filterCategories(value.target.value)}></input>
                            <SearchIcon className='search-icon-filter-nav' />
                        </div>
                        {
                            orgContext.totalcategories?.slice(0, 9).map((categorie, index) =>
                                <div className="checkbox" key={index}>
                                    <input type="checkbox" style={{ transform: 'scale(1.3)' }} id={categorie} name={categorie} value={categorie} onChange={selectCategories} checked={orgContext.selectedTotalcategories.indexOf(categorie) !== -1}></input>
                                    <label htmlFor={categorie}>{categorie}</label><br></br>
                                </div>
                            )
                        }
                        {
                            orgContext.totalcategories?.length > 9 ? <div className="checkbox more-tag" style={{ cursor: 'pointer' }} onClick={() => showMorefilters("totalcategories")}>
                                <div>+ More</div>
                            </div> : <></>
                        }
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">Technologies</button>
                    <div className="dropdown-content">
                        <div className="fitler-search-div">
                            <input className="filters-search" type="text" value={technologieSearchInput} placeholder="Search Technologie here." onChange={(value) => filterTechnologies(value.target.value)}></input>
                            <SearchIcon className='search-icon-filter-nav' />
                        </div>
                        {
                            orgContext.totalTechnologies?.slice(0, 9).map((technologie, index) =>
                                <div className="checkbox" key={index}>
                                    <input type="checkbox" style={{ transform: 'scale(1.3)' }} id={technologie} name={technologie} value={technologie} onChange={selectTechnologies} checked={orgContext.selectedTotalTechnologies.indexOf(technologie) !== -1}></input>
                                    <label htmlFor={technologie}>{technologie}</label><br></br>
                                </div>
                            )
                        }
                        {
                            orgContext.totalTechnologies?.length > 9 ? <div className="checkbox more-tag" style={{ cursor: 'pointer' }} onClick={() => showMorefilters("totalTechnologies")}>
                                <div>+ More</div>
                            </div> : <></>
                        }
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">Topics</button>
                    <div className="dropdown-content">
                        <div className="fitler-search-div">
                            <input className="filters-search" type="text" placeholder="Search Topic here." value={topicSearchInput} onChange={(value) => filterTopics(value.target.value)}></input>
                            <SearchIcon className='search-icon-filter-nav' />
                        </div>
                        {
                            orgContext.totalTopics?.slice(0, 9).map((topic, index) =>
                                <div className="checkbox" key={index}>
                                    <input type="checkbox" style={{ transform: 'scale(1.3)' }} id={topic} name={topic} value={topic} onChange={selectTopics} checked={orgContext.selectedTotalTopics.indexOf(topic) !== -1}></input>
                                    <label htmlFor={topic}>{topic}</label><br></br>
                                </div>
                            )
                        }
                        {
                            orgContext.totalTopics?.length > 9 ? <div style={{ cursor: 'pointer' }} className="checkbox more-tag" onClick={() => showMorefilters("totalTopics")}>
                                <div>+ More</div>
                            </div> : <></>
                        }
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn dropdown-last" onClick={handleOpenModal}>Advance Filter</button>
                </div>
            </div>

            {/* Advance Filter Modal */}
            {
                openShowMoreFilterModal ? <AdvanceFilterModal activePage={modalNav} handleCloseModal={handleCloseModal} selectStatus={selectStatus} selectCategories={selectCategories} selectYear={selectYear} selectTechnologies={selectTechnologies} selectTopics={selectTopics} /> : <></>
            }
        </div>
        <div className="picked-filters">
            <PickedFilters selectYear={selectYear} selectCategories={selectCategories} selectTechnologies={selectTechnologies} selectTopics={selectTopics} selectStatus={selectStatus} />
        </div>
    </>);
}

export default FilterNav;
