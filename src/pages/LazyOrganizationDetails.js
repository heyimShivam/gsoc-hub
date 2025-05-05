import React, { Suspense } from 'react';
import { useLocation } from "react-router-dom";
import OrganizationDetailsShimmer from '../components/OrganizationDeatilsShimmer';

function LazyOrganizationDetails() {
    const OrganizationDetails = React.lazy(() => import('./OrganizationDetails'));
    const location = useLocation();
    const { githubID, orgName } = location.state || {};
    const queryParams = new URLSearchParams(location.search);
    const githubIDParams = queryParams.get('github');
    const orgNameParams = queryParams.get('name');

    return <>
        <Suspense fallback={<OrganizationDetailsShimmer />}>
            <OrganizationDetails orgName={orgName || orgNameParams} githubIDpassed={githubID || githubIDParams} />
        </Suspense>
    </>
}

export default LazyOrganizationDetails;