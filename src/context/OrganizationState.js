import React, { useState } from "react";
import OrganizationContext from "./OrganizationContext";
import organizationsDetailsObject from '../data/CompiledData/organizations.json';

const OrganizationState = (props) => {
    const [orgsData, setOrgsData] = useState(organizationsDetailsObject.orgData);
    const [filteredOrgsData, setFilteredOrgsData] = useState(organizationsDetailsObject.orgData);
    const [totalGsocYears, setTotalGsocYears] = useState(organizationsDetailsObject.totalGsocYears);
    const [totalTopics, setTotalTopics] = useState(organizationsDetailsObject.totalTopics);
    const [totalcategories, setTotalcategories] = useState(organizationsDetailsObject.totalCategories);
    const [totalTechnologies, setTotalTechnologies] = useState(organizationsDetailsObject.totalTechnologies);
    const [selectedGsocYears, setSelectedGsocYears] = useState([]);
    const [selectedTotalTopics, setSelectedTotalTopics] = useState([]);
    const [selectedTotalcategories, setSelectedTotalcategories] = useState([]);
    const [selectedTotalTechnologies, setSelectedTotalTechnologies] = useState([]);
    const [allorgSelected, setAllorgSelected] = useState(true);
    const [allGSoCFilterValues, setAllGSoCFilterValues] = useState([]);
    const [openMobileNav, setOpenMobileNav] = useState(false);

    const updateOpenMobileNav = () => {
        setOpenMobileNav(!openMobileNav);
    }

    const formAllGSoCFilterValues = () => {
        let pickerSearchBarAllOptions = [];

        totalGsocYears.map(value => {
            pickerSearchBarAllOptions.push({
                filterValue: value,
                filterType: "selectedGsocYears",
            })
        });

        totalTopics.map(value => {
            pickerSearchBarAllOptions.push({
                filterValue: value,
                filterType: "selectedTotalTopics",
            })
        });

        totalcategories.map(value => {
            pickerSearchBarAllOptions.push({
                filterValue: value,
                filterType: "selectedTotalcategories",
            })
        });

        totalTechnologies.map(value => {
            pickerSearchBarAllOptions.push({
                filterValue: value,
                filterType: "selectedTotalTechnologies",
            })
        });

        setAllGSoCFilterValues(pickerSearchBarAllOptions);
    }

    const filterOrgs = (updatedData) => {
        setOrgsData(updatedData);

        setSelectedGsocYears([]);
        setSelectedTotalTopics([]);
        setSelectedTotalTechnologies([]);
        setSelectedTotalcategories([]);

        // Need to update this after async operations.
        setTimeout(() => {
            setFilteredOrgsData(updatedData);
        });
    }


    const resetAllFilterData = () => {
        setTotalGsocYears(organizationsDetailsObject.totalGsocYears);
        setTotalTopics(organizationsDetailsObject.selectedTotalTopics);
        setTotalcategories(organizationsDetailsObject.selectedTotalcategories);
        setTotalTechnologies(organizationsDetailsObject.selectedTotalTechnologies);
    }

    const updateSearchFilters = (filterName, data) => {
        if (filterName === "selectedGsocYears") {
            setTotalGsocYears(data);
        }

        if (filterName === "selectedTotalTopics") {
            setTotalTopics(data);
        }

        if (filterName === "selectedTotalTechnologies") {
            setTotalTechnologies(data);
        }

        if (filterName === "selectedTotalcategories") {
            setTotalcategories(data);
        }
    }

    const removefiltersOrgsData = () => {
        setOrgsData(organizationsDetailsObject.orgData);
    }

    const filtersHash = {
        selectedGsocYears: 0,
        selectedTotalTopics: 0,
        selectedTotalTechnologies: 0,
        selectedTotalcategories: 0
    };

    function isSubset(array1, array2) {
        return array1.every(element => array2.includes(element));
    }

    const UpdateOrgsAccTOFilters = () => {
        const selectedGSoCYearInNumber = selectedGsocYears.map(value => Number(value));

        let tempData = [];
        
        organizationsDetailsObject.orgData.map((mainOrgData) => {
            if (selectedGsocYears.length === 0 || isSubset(selectedGSoCYearInNumber, mainOrgData.year) || (selectedGSoCYearInNumber.includes(-20) && mainOrgData.year.length === 1 && mainOrgData.year[0] === organizationsDetailsObject.totalGsocYears[organizationsDetailsObject.totalGsocYears.length - 1])) {
                if (selectedTotalTopics.length === 0 || isSubset(selectedTotalTopics, mainOrgData.topics)) {
                    if (selectedTotalTechnologies.length === 0 || isSubset(selectedTotalTechnologies, mainOrgData.technologies)) {
                        if (selectedTotalcategories.length === 0 || isSubset(selectedTotalcategories, mainOrgData.category)) {
                            tempData.push(mainOrgData);
                        }
                    }
                }
            }
        })

        setFilteredOrgsData(tempData);
    }

    const updateFilterData = (filterName, data) => {
        if (filterName === "selectedGsocYears") {
            setSelectedGsocYears(data);
            filtersHash.selectedGsocYears = data.length;
        }

        if (filterName === "selectedTotalTopics") {
            setSelectedTotalTopics(data);
            filtersHash.selectedTotalTopics = data.length;
        }

        if (filterName === "selectedTotalTechnologies") {
            setSelectedTotalTechnologies(data);
            filtersHash.selectedTotalTechnologies = data.length;
        }

        if (filterName === "selectedTotalcategories") {
            setSelectedTotalcategories(data);
            filtersHash.selectedTotalcategories = data.length;
        }

        if (filtersHash.selectedGsocYears === 0 &&
            filtersHash.selectedTotalTopics === 0 &&
            filtersHash.selectedTotalTechnologies === 0 &&
            filtersHash.selectedTotalcategories === 0) {
            setAllorgSelected(true);
        } else {
            setAllorgSelected(false);
        }
    }

    return <OrganizationContext.Provider value={{
        orgsData,
        totalGsocYears,
        totalTopics,
        totalcategories,
        totalTechnologies,
        selectedGsocYears,
        selectedTotalTopics,
        selectedTotalTechnologies,
        selectedTotalcategories,
        allorgSelected,
        filteredOrgsData,
        allGSoCFilterValues,
        openMobileNav,
        updateOpenMobileNav,
        filterOrgs,
        removefiltersOrgsData,
        updateFilterData,
        updateSearchFilters,
        resetAllFilterData,
        UpdateOrgsAccTOFilters,
        setFilteredOrgsData,
        formAllGSoCFilterValues
    }}>
        {props.children}
    </OrganizationContext.Provider>
}

export default OrganizationState; 
