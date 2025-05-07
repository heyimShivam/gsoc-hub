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
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [selectedTotalTopics, setSelectedTotalTopics] = useState([]);
    const [selectedTotalcategories, setSelectedTotalcategories] = useState([]);
    const [selectedTotalTechnologies, setSelectedTotalTechnologies] = useState([]);
    const [allorgSelected, setAllorgSelected] = useState(true);
    const [allGSoCFilterValues, setAllGSoCFilterValues] = useState([]);
    const [openMobileNav, setOpenMobileNav] = useState(false);
    const [mobileNavclosingAnimation, setMobileNavclosingAnimation] = useState(true);

    const updateOpenMobileNav = () => {
        setMobileNavclosingAnimation(!mobileNavclosingAnimation);
        if (openMobileNav) {
            setTimeout(() => {
                setOpenMobileNav(!openMobileNav);
            }, 500);
        } else {
            setOpenMobileNav(!openMobileNav);
        }
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

        if (selectedGsocYears.length > 0)
            setSelectedGsocYears([]);
        if (selectedTotalTopics.length > 0)
            setSelectedTotalTopics([]);
        if (selectedTotalTechnologies.length > 0)
            setSelectedTotalTechnologies([]);
        if (selectedTotalcategories.length > 0)
            setSelectedTotalcategories([]);
        if (selectedStatus.length > 0)
            setSelectedStatus([]);

        // this is added here becuase selectedGsocYears and all are dependency in the the use effect.
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
        selectedTotalcategories: 0,
        selectedTotalStatus: 0
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
                            if (selectedStatus.length === 0 || selectedStatus.length === 2 || (mainOrgData.activeOrg && isSubset(selectedStatus, ["active"])) || (!mainOrgData.activeOrg && isSubset(selectedStatus, ["inactive"]))) {
                                tempData.push(mainOrgData);
                            }
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

        if (filterName === "selectedStatus") {
            setSelectedStatus(data);
            filtersHash.selectedTotalStatus = data.length;
        }

        if (filtersHash.selectedGsocYears === 0 &&
            filtersHash.selectedTotalTopics === 0 &&
            filtersHash.selectedTotalTechnologies === 0 &&
            filtersHash.selectedTotalcategories === 0 &&
            filtersHash.selectedTotalStatus === 0) {
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
        selectedStatus,
        selectedTotalTopics,
        selectedTotalTechnologies,
        selectedTotalcategories,
        allorgSelected,
        filteredOrgsData,
        allGSoCFilterValues,
        openMobileNav,
        mobileNavclosingAnimation,
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
