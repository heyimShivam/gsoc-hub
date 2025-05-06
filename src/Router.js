import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import PageNotFound from "./pages/PageNotFound";
import App from "./App";
import OpensourceTimeline from "./pages/OpensourceTimeline";
import AllOrganizations from "./pages/AllOrganizations";
import LazyOrganizationDetails from "./pages/LazyOrganizationDetails";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/opensource-timeline",
                element: <OpensourceTimeline />
            },
            {
                path: "/organization",
                element: <AllOrganizations />,
            },
            {
                path: "/organization/:organizationID",
                element: <LazyOrganizationDetails />,
            }
        ],
    },
    {
        path: "*",
        element: <PageNotFound />
    }
]);

export default Router;
