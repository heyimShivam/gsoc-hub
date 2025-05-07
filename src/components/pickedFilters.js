import "./pickedFilters.css";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import OrganizationContext from '../context/OrganizationContext';
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useEffect, useState } from "react";

const PickedFilters = ({
    selectYear,
    selectCategories,
    selectTechnologies,
    selectTopics,
    selectStatus }) => {

    const orgContext = useContext(OrganizationContext);
    const [pickerSearchText, setPickerSearchText] = useState('');
    const [pickerSearchBarOptions, setPickerSearchBarOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        orgContext.formAllGSoCFilterValues();
        setPickerSearchBarOptions(orgContext.allGSoCFilterValues);
    }, []);

    function applyThisFilter(value) {
        if (value.filterType === "selectedGsocYears") {
            let currData = [...orgContext.selectedGsocYears];
            let eleIndex = currData.indexOf(value.filterValue.toString());

            if (eleIndex === -1) {
                currData.push(value.filterValue.toString());
            }

            orgContext.updateFilterData("selectedGsocYears", currData);
        }

        if (value.filterType === "selectedTotalTopics") {
            let currData = [...orgContext.selectedTotalTopics];
            let eleIndex = currData.indexOf(value.filterValue);

            if (eleIndex === -1) {
                currData.push(value.filterValue);
            }

            orgContext.updateFilterData("selectedTotalTopics", currData);
        }

        if (value.filterType === "selectedTotalcategories") {
            let currData = [...orgContext.selectedTotalcategories];
            let eleIndex = currData.indexOf(value.filterValue);

            if (eleIndex === -1) {
                currData.push(value.filterValue);
            }

            orgContext.updateFilterData("selectedTotalcategories", currData);
        }
        if (value.filterType === "selectedTotalTechnologies") {
            let currData = [...orgContext.selectedTotalTechnologies];
            let eleIndex = currData.indexOf(value.filterValue);

            if (eleIndex === -1) {
                currData.push(value.filterValue);
            }

            orgContext.updateFilterData("selectedTotalTechnologies", currData);
        }
    }

    function updatePickerSearchText(searchText) {
        setPickerSearchText(searchText);

        if (searchText === "") {
            setShowOptions(false);
        } else {
            setShowOptions(true);
        }


        const data = [];

        orgContext.allGSoCFilterValues.forEach((val) => {
            if (val?.filterValue.toString().toLowerCase().replace(/ /g, '').includes(searchText.replace(/ /g, ''))) {
                data.push(val);
            }
        });

        setPickerSearchBarOptions(data);
    }

    return (<>
        {(orgContext.selectedGsocYears.length > 0) ||
            (orgContext.selectedTotalcategories.length > 0) ||
            (orgContext.selectedTotalTechnologies.length > 0) ||
            (orgContext.selectedTotalTopics.length > 0) ||
            (orgContext.selectedStatus.length > 0) ?
            <div className="pick-area">
                <div className="applied-filter-text">
                    Applied Filters
                </div>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {
                        orgContext.selectedStatus.map((value, index) =>
                            <Chip color="warning" label={value} onDelete={() => { selectStatus(value) }} key={value + index} />
                        )
                    }
                    {
                        orgContext.selectedGsocYears.map((value, index) =>
                            (value === "-20") ? <Chip color="primary" label={`Only in ${orgContext.totalGsocYears[orgContext.totalGsocYears.length - 1]}`} onDelete={() => { selectYear({ target: { value: value } }) }} key={value + index + 20} />
                                : <Chip color="primary" label={value} onDelete={() => { selectYear({ target: { value: value } }) }} key={value + index + 20} />
                        )
                    }

                    {
                        orgContext.selectedTotalcategories.map((value, index) =>
                            <Chip color="info" label={value} onDelete={() => { selectCategories({ target: { value: value } }) }} key={value + index} />
                        )
                    }

                    {
                        orgContext.selectedTotalTechnologies.map((value, index) =>
                            <Chip color="secondary" label={value} onDelete={() => { selectTechnologies({ target: { value: value } }) }} key={value + index} />
                        )
                    }

                    {
                        orgContext.selectedTotalTopics.map((value, index) =>
                            <Chip color="success" label={value} onDelete={() => { selectTopics({ target: { value: value } }) }} key={value + index} />
                        )
                    }
                    {/* <div className="picker-search" id="pickerSearch">
                        <input type="text" placeholder="Search filter here" value={pickerSearchText} onChange={(value) => { updatePickerSearchText(value.target.value) }}></input>
                        <SearchIcon className='picker-search-icon' />

                        {showOptions && pickerSearchBarOptions.length > 0 ? <div className="tool-tip-picker-search">
                            {
                                pickerSearchBarOptions?.slice(0, 11).map((value, index) => {
                                    return <div key={index} className="picker-search-options" onClick={() => { applyThisFilter(value) }}>{value.filterValue}</div>
                                })
                            }
                        </div> : <></>}
                    </div> */}
                </Stack>
            </div> :
            <></>}
    </>)
}

export default PickedFilters;
