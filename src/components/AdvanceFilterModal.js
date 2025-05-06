import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useContext } from 'react';
import OrganizationContext from '../context/OrganizationContext';
import {
    filterByTopics,
    filterByTechnologies,
    filterByYear,
    filterByCategories
} from "../filter/filter";

const AdvanceFilterModal = ({
    activePage,
    handleCloseModal,
    selectCategories,
    selectYear,
    selectTechnologies,
    selectTopics
}) => {
    const orgContext = useContext(OrganizationContext);
    const [advanceFilterInput, setAdvanceFilterInput] = useState("");
    const [modalNav, setModalNav] = useState(activePage);

    function advanceFilter(value) {
        setAdvanceFilterInput(value);

        if (modalNav === "totalcategories") {
            const filterData = filterByCategories(value);

            orgContext.updateSearchFilters("selectedTotalcategories", filterData);
        }

        if (modalNav === "totalGsocYears") {
            const filterData = filterByYear(value);

            orgContext.updateSearchFilters("selectedGsocYears", filterData);
        }

        if (modalNav === "totalTechnologies") {
            const filterData = filterByTechnologies(value);

            orgContext.updateSearchFilters("selectedTotalTechnologies", filterData);
        }

        if (modalNav === "totalTopics") {
            const filterData = filterByTopics(value);

            orgContext.updateSearchFilters("selectedTotalTopics", filterData);
        }
    }

    function updateModalNav(activeTab) {
        setModalNav(activeTab);
    }

    return (<>
        <div className="modal-outside">
            <div className="modal-more-filter">
                <div className="modal-title-and-icon">
                    <div className="modal-title">Advance Filters</div>
                    <div><CloseIcon onClick={handleCloseModal} /></div>
                </div>

                <div className="modal-cover">
                    <div className="search-input-modal">
                        <input type="text" placeholder="Search here." value={advanceFilterInput} onChange={(value) => advanceFilter(value.target.value)} />
                        <SearchIcon className="search-icon-modal" />
                    </div>
                </div>

                <div className="modal-main-container">
                    {
                        modalNav === "totalcategories" && orgContext.totalcategories ? orgContext.totalcategories.map((value, index) =>
                            <div className="checkbox-modal" key={index}>
                                <input type="checkbox" style={{ transform: 'scale(1.2)' }} id={value} name={value} value={value} onChange={selectCategories} checked={orgContext.selectedTotalcategories.indexOf(value) !== -1}></input>
                                <label htmlFor={value}>{value}</label><br></br>
                            </div>
                        ) : <></>
                    }
                    {
                        modalNav === "totalTechnologies" && orgContext.totalTechnologies ? orgContext.totalTechnologies.map((technologie, index) =>
                            <div className="checkbox-modal" key={index}>
                                <input type="checkbox" style={{ transform: 'scale(1.2)' }} id={technologie} name={technologie} value={technologie} onChange={selectTechnologies} checked={orgContext.selectedTotalTechnologies.indexOf(technologie) !== -1}></input>
                                <label htmlFor={technologie}>{technologie}</label><br></br>
                            </div>
                        ) : <></>
                    }
                    {
                        modalNav === "totalTopics" && orgContext.totalTopics ? orgContext.totalTopics.map((value, index) =>
                            <div className="checkbox-modal" key={index}>
                                <input type="checkbox" style={{ transform: 'scale(1.2)' }} id={value} name={value} value={value} onChange={selectTopics} checked={orgContext.selectedTotalTopics.indexOf(value) !== -1}></input>
                                <label htmlFor={value}>{value}</label><br></br>
                            </div>
                        ) : <></>
                    }
                    {
                        modalNav === "totalGsocYears" && orgContext.totalGsocYears ? (
                            <>
                                <div className="checkbox-modal">
                                    <input type="checkbox" style={{ transform: 'scale(1.3)' }} id="only-this-year" name="only-this-year" value={"-20"} onChange={selectYear} checked={orgContext.selectedGsocYears.indexOf("-20") !== -1}></input>
                                    <label htmlFor='only-this-year'>Only in {orgContext.totalGsocYears[orgContext.totalGsocYears.length - 1]}</label><br></br>
                                </div>
                                {
                                    orgContext.totalGsocYears.map((year, index) =>
                                        <div className="checkbox-modal" key={index}>
                                            <input type="checkbox" style={{ transform: 'scale(1.2)' }} id={year} name={year} value={year} onChange={selectYear} checked={orgContext.selectedGsocYears.indexOf(year.toString()) !== -1} />
                                            <label htmlFor={year}>{year}</label><br></br>
                                        </div>)
                                }
                            </>
                        ) : <></>
                    }
                </div>

                <div className="modal-footer">
                    <div onClick={() => updateModalNav("totalGsocYears")}
                        className={modalNav === "totalGsocYears" ? "active-modal" : ""}>
                        Year
                    </div>
                    <div onClick={() => updateModalNav("totalcategories")}
                        className={modalNav === "totalcategories" ? "active-modal" : ""}>
                        Categories
                    </div>
                    <div onClick={() => updateModalNav("totalTechnologies")}
                        className={modalNav === "totalTechnologies" ? "active-modal" : ""}>
                        Technologies
                    </div>
                    <div onClick={() => updateModalNav("totalTopics")}
                        className={modalNav === "totalTopics" ? "active-modal" : ""}>
                        Topics
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default AdvanceFilterModal;