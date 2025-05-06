import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
    const viewAllorganization = () => {
        navigate("/organization");
    }

    return <>
        <div className="PageNotFound">
            <div className="oops">Oops! <span className="oops-text">The page you're looking for doesn't exist.</span></div>
            <div>It might have been moved or deleted.</div>
            <div className="view-all-gsoc-orgs" onClick={() => { viewAllorganization() }}>Browse GSoC Organizations</div>
        </div>
    </>
}
export default PageNotFound;