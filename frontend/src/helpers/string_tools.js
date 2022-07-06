const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const dataToQuery = (searchForm) => {

    let querySearch = ""

    if (!searchForm !== "") {
        querySearch = searchForm.replace(" ", "-").toLowerCase();
    }

    return querySearch;
}

const queryToData = (query) => {

    let tempQuery = query;
    let keywords = {
        jobDesc: "",
        location: "",
        isFullTime: ""
    };

    
    if (tempQuery.includes("fulltime")) {
        tempQuery = (tempQuery.length === 8) ? tempQuery : tempQuery.slice(0, tempQuery.length - 9);
        keywords['isFullTime'] = true;
    } else if (tempQuery.includes("parttime")) {
        tempQuery = (tempQuery.length === 8) ? tempQuery : tempQuery.slice(0, tempQuery.length - 9);
        keywords['isFullTime'] = false;
    }

    if (tempQuery.startsWith('jobs-in-')) {
        tempQuery = tempQuery.slice(8, tempQuery.length)
        keywords['location'] = tempQuery.replace("-", " ");
    } else if (tempQuery.includes('-jobs-in-')) {
        tempQuery = tempQuery.split("-jobs-in-");
        keywords['jobDesc'] = tempQuery[0].replace("-", " ");
        keywords['location'] = tempQuery[1].replace("-", " ");
    } else if (!tempQuery.includes("fulltime") && !tempQuery.includes("parttime")) {
        keywords['jobDesc'] = tempQuery.replace("-", " ");
    }
    
    return keywords

}

export { capitalize, dataToQuery, queryToData };