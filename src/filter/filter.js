import organizationsDetailsObject from '../data/CompiledData/organizations';

export const filterByTechnologies = (input) => {
    const filteredTech = [];

    organizationsDetailsObject.totalTechnologies.forEach((value) => {
        if (value.toLowerCase().replace(/ /g, '').includes(input.replace(/ /g, ''))) {
            filteredTech.push(value);
        }
    });

    return filteredTech;
}

export const filterByYear = (input) => {
    const filteredYear = [];

    organizationsDetailsObject.totalGsocYears.forEach((value) => {
        if (value.toString().replace(/ /g, '').includes(input.replace(/ /g, ''))) {
            filteredYear.push(value);
        }
    });

    return filteredYear;
}

export const filterByCategories = (input) => {
    const filteredCategories = [];

    organizationsDetailsObject.totalCategories.forEach((value) => {
        if (value.toLowerCase().replace(/ /g, '').includes(input.replace(/ /g, ''))) {
            filteredCategories.push(value);
        }
    });

    return filteredCategories;
}

export const filterByTopics = (topicName) => {
    const filteredTopics = [];

    organizationsDetailsObject.totalTopics.forEach((value) => {
        if (value.toLowerCase().replace(/ /g, '').includes(topicName.replace(/ /g, ''))) {
            filteredTopics.push(value);
        }
    });

    return filteredTopics;
}

export const filterByOrgName = (orgName) => {
    const newOrgs = [];

    organizationsDetailsObject.orgData.forEach((value) => {
        if (value.name.toLowerCase().replace(/ /g, '').includes(orgName.replace(/ /g, ''))) {
            newOrgs.push(value);
        }
    });

    return newOrgs;
};
